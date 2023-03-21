const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const moviesRoutes = require("./routes/moviesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const errorHandler = require('./middleware/errorHandle');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/movies', moviesRoutes);
app.use('/api/auth', usersRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});