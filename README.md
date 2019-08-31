# Training-Log (deployed at [stoked on training!](https://stoked-on-training.herokuapp.com/))
## Introductory Training Log

### who it’s for: 

- younger athletes who are driven to record their training for various reasons.  Could be because they are motivated to be like older kids, could be they like the reward of seeing a chart / graph at the end of the week. 
- athletes transitioning to comp level where a log is a requirement. get into the habit

### why?

- develop good training log habits before they’re required
- understand the link between training and performance at a young age
- there doesn’t seem to be anything out there geared toward kids. 

## How it works:

### structure

The web app was built using an MVC design pattern.  This is a full-stack app written using JavaScript with some helper libraries. 

Dependencies: 

- express: server code
- React: dynamically created front-end
- passport: user authentication using the local strategy
- mongoDB: database for athlete / coach / user data storage
- mongoose: ODM for database management

Front-End libraries: 

- Bootstrap
- chartsjs
- moment

### User Information

There are two types of user for this app.  

1. Coaches
2. Athletes

#### Coaches

As a coach, using the main page, you can see a list of athletes in your program who are using the app, and who have allowed coaches to see their data.  Clicking on an athlete whill bring you to a summary view of their workouts.  You may view workout data, and comment on a workoutbut cannot write data to athlete's pages otherwise.  

This gives you a summary view of how athletes are progressing over the course of the training year, and allows you to comment on the direction of their workouts.  Also, as a coach, you are able to comment on how well (or poorly) they are filling out their logs.  This is an important feature of an introductory training log! 

#### Athletes

As an athlete, using the main page, you can view a calendar with your workouts, and summary information of a selected workout. Highlighting a workout on the calendar not only shows you information about the workout, but it allows you to edit / delete the workout by clicking a button.

Clicking "Add Workout" brings you to a form page where you can fill out details of a workout you have done. Submitting this workout populates the calendar with your newly added workout. Editing a workout is very similar to adding one, and deleting is pretty self-explanatory. 

The calendar has one view: Monthly.  Each activity on the calendar is color coded by activity type, and is highlighted in a special way when a coach has commented. You can immediately see, by color / emoji tags, trends in how hard you went, and how you were feeling during workouts. 

### How to run the app on your machine

1. clone this repo
2. cd into cloned directory and run: ```npm i && cd client && npm i```
3. run ```npm start``` and away you go!
