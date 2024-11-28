const http = require('http');
const fs = require('fs');

const ports = [19153, 19154, 19155]; // Array of ports for the servers

const reqHand = (req, res) => {
    let filePath = "";
    switch(req.url){
        case '/':
            filePath = './index.html';
            break;
        case '/about':
            filePath = './about.html';
            break;
        case '/product':
            filePath = './product.html';
            break;
        case '/contact':
            filePath = './contact.html';
            break;
        default:
            filePath = './error.html';
            break;
    }

    // Read the file asynchronously and handle errors
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('<h1>500 Internal Server Error</h1>');
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}

const createServer = (port) => {
    const server = http.createServer(reqHand); // Create a new server

    server.listen(port, (err) => {
        if (err) {
            console.log(`Server on port ${port} could not start: ${err}`);
            return false;
        }
        console.log(`Server started at http://localhost:${port}`);
    });
}

// Create multiple servers
ports.forEach(port => createServer(port));