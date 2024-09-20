// Create web server
// 1. Create a web server
// 2. Handle requests and responses
// 3. Read the file
// 4. Send the file as response
// 5. Listen to the port

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
  // 2. Handle requests and responses
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  let filename = pathname.substr(1);
  if (filename === '') {
    filename = 'index.html';
  }
  const extname = path.extname(filename);
  const contentType = 'text/html';
  if (extname === '.js') {
    contentType = 'text/javascript';
  }
  if (extname === '.css') {
    contentType = 'text/css';
  }

  // 3. Read the file
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }
    // 4. Send the file as response
    res.writeHead(200, { 'Content-Type': contentType });
    res.write(data);
    return res.end();
  });
});

// 5. Listen to the port
server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});