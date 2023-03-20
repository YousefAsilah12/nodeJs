const path = require('path');
const fs = require('fs');

const dataPath = path.resolve(__dirname, '../../db/movies');

//@desc get all movies
//@route Get /api/movies
//@access public
const getMovies = (req, res) => {
  console.log("hello");
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.status(200).json({
    data
  });
};

//@desc create movies
//@route POST /api/movies
//@access public
const createMovie = (req, res) => {
  const {
    name,
    title,
    description
  } = req.body;
  if (!name || !title || !description) {
    res.status(400);
    throw new Error("all fields are required")
  } else {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const movie = { id: data.length + 1, ...req.body };
    data.push(movie);
    fs.writeFileSync(dataPath, JSON.stringify(data));
    res.status(201).json({
      message: "created movie"
    })
  }
};

//@desc update a movie
//@route PUT /api/movies/:id
//@access public
const updateMovie = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const id = parseInt(req.params.id);
  const movie = data.find(d => d.id === id);
  if (!movie) {
    res.status(404);
    throw new Error("movie not found");
  }
  const updatedMovie = { ...movie, ...req.body };
  const index = data.indexOf(movie);
  data[index] = updatedMovie;
  fs.writeFileSync(dataPath, JSON.stringify(data));
  res.status(200).json({
    message: "updated movie"
  });
};

//@desc get a movie
//@route GET /api/movies/:id
//@access public
const getMovie = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const movie = data.find(d => d.id === parseInt(req.params.id))
  if (!movie) {
    res.status(404);
    throw new Error("movie not found");
    return
  }
  res.status(200).json(movie);
};

//@desc delete a movie
//@route DELETE /api/movies/:id
//@access public
const deleteMovie = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const id = parseInt(req.params.id);
  const movie = data.find(d => d.id === id);
  if (!movie) {
    res.status(404);
    throw new Error("movie not found");
  }
  const index = data.indexOf(movie);
  data.splice(index, 1);
  fs.writeFileSync(dataPath, JSON.stringify(data));
  res.status(200).json({
    message: `deleted movie ${id}`
  });
};

module.exports = {
  getMovies,
  createMovie,
  updateMovie,
  getMovie,
  deleteMovie,
};
