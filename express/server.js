const express = require('express');
const errorHandler = require('./middleware/errorHandle');
const dotenv = require('dotenv').config();
const app = express()

const port = 5000;

app.use(express.json());
app.use('/api/movies', require("./routes/moviesRoutes"))
app.use(errorHandler)
app.listen(port, () => {
  console.log("server running on port " + port);
})