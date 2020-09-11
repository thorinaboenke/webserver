// create a local webserver
// serve files from public directory, i.e. like HTML files, CSS files, and images
// __dirname tells you the absolute path of the directory containing the currently executing file.

const http = require('http');
const url = require('url');
const fs = require('fs');
const express = require('express');
const path = require('path');
const { stringify } = require('querystring');

const app = express();
const port = 8080;

//app.use(express.static());

app.use(express.static(path.join(__dirname, 'public')));

//then acess via http://localhost:3000/html

//app.use('/html', express.static(path.join(__dirname, 'public/index.html')));
//app.use(express.static('public/index.html'));
//app.use(express.static(__dirname + '/public'));
app.listen(port, () =>
  console.log(`Webserver listening at http://localhost:${port}`),
);

// const app = http.createServer((request, response) => {
//   let query = url.parse(request.url, true).query;
//   let myurl = url.parse(request.url, true);
//   // do something with the query? how does url module work? parse?
//   response.writeHead(200, { 'Content-Type': 'text/html' }); // send stuff back to the user
//   response.write(`<h1>This seems to be a working server:<h1>`);
//   contents = stringify(query);
//   morecontents = stringify(myurl);
//   response.write(
//     `<h1>This seems to be a working server: \ ${contents} \ ${morecontents} <h1>`,
//   );
//   response.end(); // tells the server is not longer writing content
// });

// app.listen(port);

//http://localhost:3000
//http://localhost:3000/?message=hello would be a query

//the parse() method of the url module, a core Node.js module, to convert the request's URL to an object. The returned object has a query property, which retrieves the URL's parameters.
