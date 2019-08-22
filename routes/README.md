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

### athlete API routes

### coach API routes

