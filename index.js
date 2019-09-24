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
// It's ok to run this synchronous when your code first starts. Multiple users are not trying to access it.
// Synchronous = blocks other code from running until this finishes.
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);


// Call back function each time server is accessed
const server = http.createServer((req, res) => {

    // parse the URL into an object with key value pairs
    const pathName = url.parse(req.url, true).pathname;
    // Get the id that comes from the query string object
    const id = url.parse(req.url, true).query.id;

    // PRODUCTS OVERVIEW =================================
    if(pathName === '/products' || pathName === '/'){
        
    // Response sent to webpage
    res.writeHead(200, {'Content-type': 'text/html'});

    fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
        let overviewOutput = data;
        fs.readFile(`${__dirname}/templates/template-cards.html`, 'utf-8', (err, data) => {
            const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
            overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
            res.end(overviewOutput);
        });
    });

    // LAPTOP DETAIL =====================================
        // Test to check if id is always smaller than the number of objects/id's in laptopData.
    } else if(pathName === '/laptop' && id < laptopData.length) {
            // Response sent to webpage
        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
        // Actual response sent
        // res.end(`Laptop page for laptop ${id}`);
    // URL NOT FOUND =====================================
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

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;

};