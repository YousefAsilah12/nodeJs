const http = require('http');
const https = require('https');
const {
  Transform
} = require('stream');

// create a transform stream that applies a transformation to the response data
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    // apply the transformation to the chunk of data
    // for example, we could convert the response to uppercase
    const transformedChunk = chunk.toString().toUpperCase();
    callback(null, transformedChunk);
  }
});

// create an HTTP server that makes a request to the external API and pipes the transformed response to the client
const server = http.createServer((req, res) => {
  // make a request to the external API
  const request = https.get('https://63f620fa59c944921f6d9e17.mockapi.io/users', response => {
    // pipe the response through the transform stream and then to the HTTP response object
    response.pipe(transformStream).pipe(res);
  });

  // handle any errors with the request
  request.on('error', error => {
    console.error(error);
    res.statusCode = 500;
    res.end('Error making request to API');
  });
});

// start the HTTP server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});