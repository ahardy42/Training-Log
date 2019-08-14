const express = require('express');
const router = express.Router();
const db = require("../models/Index");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
    console.log("req user", coach);
    // a redirect will bring a new coach signup here to send an email with a request to sign up
    createKey().then(key => {
        const smtpTransport = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: "apikey",
                pass: "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"
            }
        });
        const mailOptions = {
            to: "aohardy@gmail.com",
            from: 'aohardy@gmail.com',
            subject: 'New Coach Request',
            text:
                `A new coach has requested to sign up! Their name is ${coach.firstName} ${coach.lastName} and they would like to join ${coach.team}
            please click the following link to activate: ${req.hostname}/email/coach-approval/${key}
            if you have any questions for the requester, here is their email: ${coach.email}.
            lastly, click here: ${req.hostname}/email/coach-deny' to deny the request!`
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

router.post("coach-approval/:key", (req, res) => {
    // if this key gets hit the coach will be created in Users and deleted in Temp! 
    let { key } = req.params;
    let projection = {
        username: 1,
        password: 1,
        type: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        team: 1
    };
    db.Temp.findOneAndDelete({ accessKey: key }, projection, (err, coach) => {
        if (err) console.log(err);
        let approvedCoach = new db.User(coach);
        approvedCoach.save((err, newCoach) => {
            if (err) console.log(err);
            const smtpTransport = nodemailer.createTransport({
                host: "smtp.sendgrid.net",
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: "apikey",
                    pass: "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"
                }
            });
            const mailOptions = {
                to: newCoach.email,
                from: 'aohardy@gmail.com',
                subject: 'New Coach Request Approved!',
                text: "Great news! " + newCoach.firstName + " , you have been approved as a coach for " + newCoach.team + ".\n\n" +
                    "Please go to " + req.hostname + "/login to login using your username and password. Your username is " + newCoach.username
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                if (err) console.log("there was an error " + err);
            });
        })
    })

});

router.post("/reset-password/:key", (req, res) => {

})

module.exports = router;