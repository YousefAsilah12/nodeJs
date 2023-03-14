const fs = require('fs');

// create new file

console.log(__dirname);
// fs.writeFileSync(__dirname + '/./newfile.txt', 'Hello World!')
const copyPath = __dirname + '/newfile.txt';
const pastePath = __dirname + '/newfileWithNewName.txt';
// try {
//   fs.copyFile(copyPath, pastePath, (err) => {
//     if (err) throw err;
//     console.log('File was successfully copied!');
//   });
// } catch (err) {
//   console.log(err);
// }

const newPath = __dirname + '/newfileWithNewName.txt';
try {
  fs.rename(copyPath, newPath, (err) => {
    if (err) throw err;
    console.log('File was renamed sucssesfully!');
  });
} catch (err) {
  console.log(err);
}