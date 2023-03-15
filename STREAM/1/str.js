const fs = require('fs');
const {
  Transform
} = require('stream');

// create a transform stream that converts lowercase to uppercase
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const upperCaseChunk = chunk.toString().toUpperCase();
    callback(null, upperCaseChunk);
  }
});

// create a readable stream to read the text file
const readableStream = fs.createReadStream(__dirname + '/./input.txt');

// create a writable stream to write to the output file
const writableStream = fs.createWriteStream(__dirname + '/./output.txt');

// pipe the readable stream through the transform stream to the writable stream
readableStream.pipe(upperCaseTransform).pipe(writableStream);