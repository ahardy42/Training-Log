const express = require('express');
const router = express.Router();
const db = require("../models");
const crypto = require("crypto");
const sgMail = require('@sendgrid/mail');
require("dotenv").config();
const adminEmail = process.env.ADMIN_EMAIL;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        const mailOptions = {
            to: adminEmail,
            from: adminEmail,
            subject: 'New Coach Request',
            text:
            "A new coach has requested to sign up! Their name is " + coach.firstName + " " + coach.lastName + " and they would like to join the team: " + coach.team + ".\n\n" +
            "please click the following link to activate: https://" + req.hostname + "/coach/approve/" + key + "\n\n" +
            "if you have any questions for the requester, here is their email: " + coach.email + ".\n\n" +
            "Click here: https://" + req.hostname + "/coach/deny/" + key + " to deny the request!\n\n" +
            "Sincerely,\n" + "Stoked On Training Admin"
        };
        sgMail.send(mailOptions);
        return key;
    })
        .then(key => {
            db.Temp.findOneAndUpdate({ username: coach.username }, { accessKey: key }, { new: true }, (err, doc) => {
                if (err) res.json({messageType: "error", message: err});
                res.json({messageType: "success", message: "An email has been sent to the administrator. You will be notified if you are approved."});
            });
        })
});

router.get("/coach-approval/:key?", (req, res) => {
    // if this key gets hit the coach will be created in Users and deleted in Temp! 
    let { key } = req.params;
    db.Temp.findOneAndDelete({ accessKey: key }, (err, coach) => {
        if (err) res.json({messageType: "error", message: err});
        if (coach) {
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
                if (err) res.json({messageType: "error", message: err});
                const mailOptions = {
                    to: newCoach.email,
                    from: adminEmail,
                    subject: 'New Coach Request Approved!',
                    text: "Great news! " + newCoach.firstName + " , you have been approved as a coach for " + newCoach.team + ".\n\n" +
                        "Please go to https://" + req.hostname + "/login to login using your username and password. Your username is " + newCoach.username +
                        " and your password is the same as the one you signed up with...\n\n" +
                        "Sincerely,\n" + "Stoked On Training Admin"
                };
                sgMail.send(mailOptions);
                res.json(newCoach);
            });
        } else {
            res.json({messageType: "error", message: "something happened!"});
        }
    })
});

router.get("/coach-deny/:key", (req, res) => {
    // if this gets hit, coach will be deleted in temp users and an email will be sent to the coach telling them they were denied approval.
    let { key } = req.params;
    db.Temp.findOneAndDelete({ accessKey: key}, (err, coach) => {
        if (err) res.json({messageType: "error", message: err});
        if (coach) {
            let returnedCoach = {
                firstName: coach.firstName,
                lastName: coach.lastName,
                email: coach.email,
                team: coach.team
            }
            const mailOptions = {
                to: returnedCoach.email,
                from: adminEmail,
                subject: 'New Coach Request Denied',
                text: "Bad news! " + returnedCoach.firstName + " , you have NOT been approved as a coach for " + returnedCoach.team + ".\n\n" +
                    "If you feel this decision was made in error, please email " + adminEmail + " and they will be able to answer any questions you may have about the decision. Thanks!\n\n" + 
                    "Sincerely,\n" + "Stoked On Training Admin"
            };
            sgMail.send(mailOptions);
            res.json(returnedCoach);
        } else {
            res.json({messageType: "error", message: "something happened!"});
        }
    });
});

router.post("/reset-password/", (req, res) => {
    // route to create a key for a password reset
    createKey().then(key => {
        let { id } = req.body;
        let returnedUser = db.User.findByIdAndUpdate(id, {resetKey: key}, {strict: false, new: true}).select('email firstName lastName resetKey _id');
        return returnedUser.exec();
    }).then(user => {
        if (!user) {
            let message = {messageType: "error", message: "something went wrong! couldn't find a user with those credentials..."}
            res.json(message);
        } else {
            let message = {messageType: "success", message: "an email was sent to the user requesting a password reset"}
            let name = `${user.firstName} ${user.lastName}`;
            const mailOptions = {
                to: user.email,
                from: adminEmail,
                subject: 'Password Reset',
                text: "Hi there " + name + " it looks like you, or somebody else, requested a password reset!\n\n" +
                    "If you would like to reset your password, please follow this link: https://" + req.hostname + "/reset/" + user.resetKey + "\n\n" +
                    "Disregard this email if you did not request a reset.\n\n" +
                    "Sincerely,\n" + "Stoked On Training Admin" 
            };
            sgMail.send(mailOptions);
            res.json(message);
        }
    })
});

// /email/reset-password/:key 
// hit when reset auth submit button is clicked to reset the user's password
// req.body includes username and params includes the key. will NOT re-direct to login yet.
router.post("/reset-password/:key", (req, res) => {
    let {key} = req.params;
    db.User.findOne({resetKey: key},(err, user) => {
        if (err) return req.flash("error",err);
        if (!user) {
            return res.json({messageType: "error", message: "Sorry no user exists with that key"});
        } else {
            let hashedPassword = user.generateHash(req.body.password);
            user.password = hashedPassword;
            user.resetKey = null;
            user.save({new: true}, (err, updatedUser) => {
                if (err) res.json({messageType: "error", message: err})
                let name = `${updatedUser.firstName} ${updatedUser.lastName}`;
                // sendgrid email to notify user their password has been changed
                const mailOptions = {
                    to: updatedUser.email,
                    from: adminEmail,
                    subject: 'Password Reset',
                    text: "Hi there " + name + " it looks like you have successfully reset your password!\n\n" +
                    "Please go to https://" + req.hostname + "/login to login using your username and password.\n\n" +
                    "Sincerely,\n" + "Stoked On Training Admin"
                };
                sgMail.send(mailOptions);
                res.json({messageType: "success", message: name + " you have successfully reset your password!"});
            });
        }
    });
});

module.exports = router;