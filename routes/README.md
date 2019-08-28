## API routes

Below you will find information on API routes, and the resulting JSON objects returned:

### authentication routes

```/auth/login // POST route```

expects a json user object:
```js
{
  "username" : "String",
  "password" : "String"
}
```
returns a user object:
```js
{
  "_id" : "String",
  "email" : "String",
  "username" : "String",
  "firstName" : "String",
  "lastName" : "String",
  "training" : [...{}],
  "team" : "String",
  "type" : "String"
}
```

```/auth/signup //POST route```

expects a json user object:
```js
{
  "email" : "String",
  "username" : "String",
  "password" : "String",
  "firstName" : "String",
  "lastName" : "String",
  "team" : "String",
  "type" : "String"
}
```

if "type" is coach, the user object is saved as a new document in the "Temp" collection, if "type" is athlete, then user object is saved as a new document in the "User collection.

redirects: 
```js
// {"type" : "Coach"}

res.redirect(307, "/email/new-coach")

// {"type" : "Athlete"}

res.redirect(307, "auth/login")

// user object
{
  "_id" : "String",
  "email" : "String",
  "username" : "String",
  "password" : "String", // hashed with Bcrypt.generateHash()
  "firstName" : "String",
  "lastName" : "String",
  "training" : [...{}],
  "team" : "String",
  "type" : "String"
}
```

```/auth/profile //GET route```

returns: 
```js
{
  "_id" : "String",
  "email" : "String",
  "username" : "String",
  "firstName" : "String",
  "lastName" : "String",
  "training" : [...{}],
  "team" : "String",
  "type" : "String"
}
```

```auth/logout //GET route```

returns:
```js
"User logged out Successfully"
```

```/auth/reset //POST route```

expects a json user object:
```js
{
  "email" : "String"
}
```

returns array of user objects with the email in req.body:
```js
[
  {...user},
  ...
]
```

```/auth/reset-password/:key //GET route```

returns user object:
```js
{
  "_id" : "String",
  "email" : "String",
  "username" : "String",
  "firstName" : "String",
  "lastName" : "String",
  "training" : [...{}],
  "team" : "String",
  "type" : "String"
}
```

### email routes

```/email/new-coach //POST route```

this route is hit from a re-direct and is carrying a coach object in req.body.  it will send an email to the defined administrator for that team, and will pass along a newly created key corresponding to that coach.

returns:
```js
//if there's an error
{messageType : "error", message : err}

// if there is no error
{messageType : "success", message : "An email has been sent to the administrator. You will be notified if you are approved."}
```

```/email/coach-approval/:key? //GET route```

this route deletes the coach with the key found in req.params, stored in the Temp db collection, it then copies that coach's information to the User db collection and returns a message object

returns:
```js
//if there's an error
{messageType : "error", message : "something happened!"}

// if there is no error
{messageType : "success", message : "success!"}
```

```/email/reset-password //POST route```

this route expects a JSON object:

```js
{
  "id" : "idString"
}
```

and will send an email, along with a newly created key to the user whose ObjectId matches the idString. That user now has a resetKey key in their user document

returns:
```js
// if there is an error
{messageType: "error", message: "something went wrong! couldn't find a user with those credentials..."}

// if there is no error
{messageType: "success", message: "an email was sent to the user requesting a password reset"}
```
```/email/reset-password/:key //POST route```

this route expects an object and a request parameter, key

``
{username : usernameString}
```

returns:

```js
//if there's an error
{messageType: "error", message: "Sorry no user exists with that key"}

//if there is no error
{messageType: "success", message: name + " you have successfully reset your password!"}
```



### athlete API routes

### coach API routes

