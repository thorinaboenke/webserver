const http = require('http');
const fs = require('fs');
const path = require('path');
const { listenerCount } = require('cluster');

const port = 8080;

//http.createServer(request listener) creates server object that can listen to ports
//on the computer and can execute a function i.e. the request listener each time a request is made
// here we want to serve static files from the folder 'public'
http
  .createServer(function (request, response) {
    console.log('request starting...');
    // extract the filepath from url to be used further down with fs.readfile to display the content
    // for just http://localhost:${port} the request.url is '/'
    let filePath = '.' + request.url;
    if (filePath === './') {
      filePath = './public/index.html'; // if no url is specified, use this as 'landing page'
    } else {
      filePath = './' + 'public' + request.url;
      console.log(filePath);
    }

    console.log(request.url);
    let extname = path.extname(filePath); // which filetype is requested? html/css/js etc. ??
    let contentType = 'text/html'; // change the contentType according to requested file
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      case '.wav':
        contentType = 'audio/wav';
        break;
    }
    // reads the content of the file specifed in filePath, the callback function handles possible errors (display 404 file)
    // or does something with the file content
    fs.readFile(filePath, function (error, content) {
      // this section handles errors
      if (error) {
        if (error.code == 'ENOENT') {
          // for 404 errors
          fs.readFile('./public/404.html', function (error, content) {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
          });
        } else {
          // for all other errors
          response.writeHead(500);
          response.end('Sorry, an error occured: ' + error.code + ' ..\n');
          response.end();
        }
        // this section displays the content of the file if no error occured:
      } else {
        // writes the http header. must only be called once on a message and it must be called before response.end() is called. HTTP request header is the information, in the form of a text record, that a user's browser sends to a Web server containing the details of what the browser wants and will accept back from the server?
        response.writeHead(200, { 'Content-Type': contentType });
        // writes the body and closes the response
        response.end(content, 'utf-8');
      }
    });
  })
  // speficies the port the server should listen to
  .listen(port);

console.log(`Server running at http://localhost:${port}`);
