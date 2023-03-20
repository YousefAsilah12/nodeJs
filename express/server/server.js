const express = require('express');
const errorHandler = require('./middleware/errorHandle');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express()

const port = 5000;

app.use(cors())
app.use(express.json());
app.use('/api/movies', require("./routes/moviesRoutes"))
app.use('/api/auth', require("./routes/usersRoutes"))
app.use(errorHandler)
app.listen(port, () => {
  console.log("server running on port " + port);
})