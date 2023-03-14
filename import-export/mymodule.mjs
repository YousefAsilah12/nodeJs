// myModule.js

import fs from 'fs';

// Function to read a file and return its contents as a string
export function readFileToString(filePath) {
  const fileData = fs.readFileSync(filePath);
  return fileData.toString();
}

// Function to write a string to a file
export function writeStringToFile(filePath, data) {
  fs.writeFileSync(filePath, data);
}

// Function to append a string to a file
export function appendStringToFile(filePath, data) {
  fs.appendFileSync(filePath, data);
}