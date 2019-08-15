const express = require('express');
const router = express.Router();
const db = require("../models/Index");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendGridKey = process.env.SENDGRID_PASSWORD;
const sendGridUsername = process.env.SENDGRID_USERNAME;
const adminEmail = process.env.ADMIN_EMAIL;

// =====================================================================================
//                               API routes for email related activies
// =====================================================================================

const createKey = () => { // create a unique key to be used in a chain below!
    return new Promise((resolve, reject) => {
        crypto.randomBytes(20, (err, buf) => {
            if (err) reject(err);
            let key = buf.toString("hex");
            resolve(key);
        });
    });
}

router.post("/new-coach", (req, res) => {
    let coach = req.body;
    // a redirect will bring a new coach signup here to send an email with a request to sign up
    createKey().then(key => {
        const smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: sendGridUsername,
                pass: sendGridKey
            }
        });
        const mailOptions = {
            to: "adminEmail",
            from: adminEmail,
            subject: 'New Coach Request',
            text:
            "A new coach has requested to sign up! Their name is " + coach.firstName + " " + coach.lastName + " and they would like to join the team: " + coach.team + ".\n\n" +
            "please click the following link to activate: http://" + req.hostname + "/email/coach-approval/" + key + "\n\n" +
            "if you have any questions for the requester, here is their email: " + coach.email + ".\n\n" +
            "Click here: " + req.hostname + "/email/coach-deny to deny the request!"
        };
        smtpTransport.sendMail(mailOptions, (err) => {
            if (err) console.log("there was an error " + err);
        });
        console.log(key);
        return key;
    })
        .then(key => {
            db.Temp.findOneAndUpdate({ username: coach.username }, { accessKey: key }, { new: true }, (err, doc) => {
                if (err) console.log(err);
                res.json(doc);
            });
        })
});

router.get("/coach-approval/:key?", (req, res) => {
    // if this key gets hit the coach will be created in Users and deleted in Temp! 
    let { key } = req.params;
    console.log(key);
    db.Temp.findOneAndDelete({ accessKey: key }, (err, coach) => {
        if (err) console.log("the error is in findOneAndDelete",err);
        console.log(coach);
        let tempCoach = {
            firstName: coach.firstName,
            lastName: coach.lastName,
            email: coach.email,
            username: coach.username,
            password: coach.password,
            team: coach.team,
            type: coach.type
        }
        let approvedCoach = new db.User(tempCoach);
        approvedCoach.save((err, newCoach) => {
            if (err) console.log("the error is in saving the new coach",err);
            const smtpTransport = nodemailer.createTransport({
                host: "smtp.sendgrid.net",
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: sendGridUsername,
                    pass: sendGridKey
                }
            });
            const mailOptions = {
                to: newCoach.email,
                from: adminEmail,
                subject: 'New Coach Request Approved!',
                text: "Great news! " + newCoach.firstName + " , you have been approved as a coach for " + newCoach.team + ".\n\n" +
                    "Please go to http://" + req.hostname + "/login to login using your username and password. Your username is " + newCoach.username +
                    "and your password is the same as the one you signed up with..."
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                if (err) console.log("there was an error " + err);
            });
            res.json(newCoach);
        })
    })

});

router.post("/reset-password/", (req, res) => {
    // route to create a key for a password reset
    createKey().then(key => {
        let { id } = req.body;
        let returnedUser = db.User.findByIdAndUpdate(id, {resetKey: key}, {strict: false, new: true});
        return returnedUser.exec();
    }).then(user => {
        let name = `${user.firstName} ${user.lastName}`;
        const smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: sendGridUsername,
                pass: sendGridKey
            }
        });
        const mailOptions = {
            to: user.email,
            from: adminEmail,
            subject: 'Password Reset',
            text: "Hi there " + name + " it looks like you, or somebody else, requested a password reset!\n\n" +
            "If you would like to reset your password, please follow this link: http://" + req.hostname + "/reset/" + user.resetKey + "\n\n" +
            "Disregard this email if you did not request a reset."
        };
        smtpTransport.sendMail(mailOptions, (err) => {
            if (err) console.log("there was an error " + err);
        });
        return req.flash("success", "An email has been sent to the address on file for this user");
    })
});

// /email/reset-password/:key 
// hit when reset auth submit button is clicked to reset the user's password
// req.body includes username and params includes the key. will NOT re-direct to login yet.
router.post("/reset-password/:key", (req, res) => {
    let {key} = req.params;
    db.User.findOne({resetKey: key}, {new: true},(err, user) => {
        if (err) return req.flash("error",err);
        if (!user) {
            return req.flash("error", "Sorry no user exists with that key");
        } else {
            let hashedPassword = user.generateHash(req.body.password);
            user.password = hashedPassword;
            user.resetKey = null;
            user.save({new: true}, (err, user) => {
                req.flash("success", "you have updated your password! You may login using the new password");
            })
        }
    });
});

module.exports = router;