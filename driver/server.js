const fs = require('fs');
const http = require('http');
const path = require('path');
const opn = require('opn');

http.createServer(function (req, res) {
    const route = req.url.split('?')[0];
    console.info(`${route}`);

    switch (route) {
        case '/css/main.css':
            res.writeHead(200, { 'Content-Type': 'text/css' });

            fs.readFile(path.join(__dirname, 'css', 'main.css'), function (err, data) {
                res.end(data);
            });

            break;
        case '/dist/life.js':
            res.writeHead(200, { 'Content-Type': 'text/javascript' });

            fs.readFile(path.join(__dirname, '..', 'dist', 'life.js'), function (err, data) {
                res.end(data);
            });

            break;
        case '/favicon.ico':
            res.writeHead(200, { 'Content-Type': 'text/plain' });

            fs.readFile(path.join(__dirname, 'favicon.ico'), function (err, data) {
                res.end(data);
            });

            break;
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });

            fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
                let html = data.toString();

                html = html.replace('std-link', 'std-link active');

                res.end(html);
            });

            break;
        default:
            res.writeHead(404);
            res.end();
    }
}).listen(8080);

setTimeout(() => {
    console.log('@shaunlmason/life is running on port: 8080');

    opn('http://localhost:8080').catch((err) => {
        console.error(`error: ${err}`);
    });
});
