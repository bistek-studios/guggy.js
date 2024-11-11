const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring"); 
const returnContentType = require("return-content-type");

let app = {};
app.hostname = "localhost";
app.port = 8000;
app.headers = {};
app.routes = {};
app.routes.get = {};
app.routes.post = {};
app.get = (url,callback) => {
    app.routes.get[url] = callback;
};
app.post = (url,callback) => {
    app.routes.post[url] = callback;
};
app.listen = () => {
    http.createServer((req,res) => {
        let url = req.url;
        let ext = {};
        res.send = (filePath) => {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                    return;
                }

                const extens = path.extname(filePath);
                let contentType = returnContentType(extens);

                res.writeHead(200, {
                    'Content-Type': contentType
                });

                // Create a read stream and pipe it to the response
                const readStream = fs.createReadStream(filePath);
                readStream.pipe(res);
                
                readStream.on('error', (error) => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading file');
                });
            });
        };
        res.send = (data) => {
            let header = "text/plain";

            if (data instanceof Object) header = "application/json";
            
            switch (header) {
                case "application/json":
                    res.writeHead(200, { 'Content-Type': header });
                    res.end(JSON.stringify(data));
                    break;
                default:
                    res.writeHead(200, { 'Content-Type': header });
                    res.end(data);
                    break;
            };
        }
        req.on('data', (data) => {
            ext.rawdata = "";
            ext.rawdata += data;
            ext.data = querystring.parse(ext.rawdata);
        });
        req.on('end',()=>{
            switch (req.method) {
                case "GET":
                    if (app.routes.get[url] !== undefined) {
                        app.routes.get[url](req,res,ext);
                    };
                    break;
                case "POST":
                    if (app.routes.post[url] !== undefined) {
                        app.routes.post[url](req,res,ext);
                    };
                    break;
            };
        });
    }).listen(app.port,()=>{
        console.log("running server at "+`${app.hostname}:${app.port}`);
    });
};

app.get("/",(req,res)=>{
    res.send("<h1>this is my script</h1>");
});

app.listen();

module.exports = app;