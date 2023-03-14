// const axios = require("axios");
// const request = require('request');
import fetch from "node-fetch"

const url = 'https://63f620fa59c944921f6d9e17.mockapi.io/users'
function fetchNode(url) {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
fetchNode(url)

function getByAxios(url) {
  const options = {
    method: 'GET',
    url: url,

  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

function getByRequst(url) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
}

// getByAxios(url)
// getByRequst(url)