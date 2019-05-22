
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD5F7-WRyzH8FGVutIJoPklBGic0Auf3uk",
    authDomain: "training-log-snsc.firebaseapp.com",
    databaseURL: "https://training-log-snsc.firebaseio.com",
    projectId: "training-log-snsc",
    storageBucket: "training-log-snsc.appspot.com",
    messagingSenderId: "313643944177",
    appId: "1:313643944177:web:3da662595cda1fe9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// onclick handlers only available when the page loads
$(document).ready(function () {
    // create the calendar on the page based on current month and day.
    // header on calendar

    // calendar body elements (boxes)
    var now = new Date();
    console.log(now);
    function daysInThisMonth() {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    }
    console.log(daysInThisMonth());

    // onclicks



});