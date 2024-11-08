![guggy.js](gug.png)
web server

## install
`npm i guggy.js`

in javascript code:

```javascript
const app = require("guggy.js");
```

## usage
```javascript
app.get("/",(req,res,ext)=>{
    res.send("/public/index.html"); // sends this file to the client, automatically determining content headers
});
```

## api
all the same as core njs but adds 2 new features

```javascript
res.send() // sends this file to the client, automatically determining content headers
```

```javascript
ext.data // data recieved from post requests like forms and such
```