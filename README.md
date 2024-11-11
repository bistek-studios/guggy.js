![guggy.js](gug.png)

web server

## install
`npm i guggyjs`

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
res.sendFile() // sends this file to the client, automatically determining content headers
```

```javascript
res.send() // sends this data to the client, automatically determining if json or plain text. no html because seriously why would you wanna store html in a string, you psychopath.
```

```javascript
ext.rawdata // data recieved from post requests like forms and such
```

```javascript
ext.data // parsed rawdata, dont use this...
```