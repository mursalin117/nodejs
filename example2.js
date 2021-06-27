var http = require('http');

http.createServer(function (req, res) {
  // for client end
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World from Bangladesh!');
  // for server end
  console.log('This example is different!');
  console.log('The result is displayed in the Command Line Interface');

}).listen(3030);