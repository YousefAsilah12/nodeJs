// main difference between import and require:

// require and import are the same thing ,they both importing a module to work with 
// require is the old way 
// import is the new way to import a module


// how you can enable import using nodeJs
//1- using fileName.mjs
//2- using package.Json change type to module 


// 2 node js enviroments that work with require 
//1- __dirname: current working directory
//2- __filename: current file name


// index.js

import { readFileToString, writeStringToFile, appendStringToFile } from './mymodule.mjs';

const filePath = './myFile.txt';
const fileContents = readFileToString(filePath);
console.log('File contents:', fileContents);

const newData = 'Hello, world!';
writeStringToFile(filePath, newData);
appendStringToFile(filePath, '\nThis is a new line.');
