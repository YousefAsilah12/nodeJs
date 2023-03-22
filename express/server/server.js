const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const moviesRoutes = require("./routes/moviesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const errorHandler = require('./middleware/errorHandle');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


const app = express();
const port =process.env.PORT|| 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/movies', moviesRoutes);
app.use('/api/auth', usersRoutes);
app.use(errorHandler);



const start = async () => {
  const {CONNECTION}=process.env
  try {
    await mongoose.connect(CONNECTION);
  } catch (error) {
    throw new Error("failed to connect to db")
  } 

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
start();