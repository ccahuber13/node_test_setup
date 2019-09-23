// node index.js to start server
// nodemon installed

// Require File System - API for interacting with the physical file system. All asynchronous or synchronous file I/O operations.
const fs = require ('fs');

// Setup our protocol to use for our web server
const http = require('http');

// URL module built in with Node
const url = require('url');

// readFileSync('file') - Read contents of a physical file
//__dirname is a variable of fs. Root directory.
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);


// Call back function each time server is accessed
const server = http.createServer((req, res) => {

    // parse the URL into an object with key value pairs
    const pathName = url.parse(req.url, true).pathname;
    if(pathName === '/products' || pathName === '/'){
        
    // Response sent to webpage
    res.writeHead(200, {'Content-type': 'text/html'});
    // Actual response sent
    res.end('Products page');

    } else if(pathName === '/laptop') {
            // Response sent to webpage
        res.writeHead(200, {'Content-type': 'text/html'});
        // Actual response sent
        res.end('Laptop page');
    } else {
            // Response sent to webpage
        res.writeHead(404, {'Content-type': 'text/html'});
        // Actual response sent
        res.end('URL was not found. 404.');
    };



});

server.listen(1337, '127.0.0.1', () => {
    console.log('Server listening on 1337 127.0.0.1');
});