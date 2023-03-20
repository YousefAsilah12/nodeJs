const express = require('express');
const router = express.Router();
const {
  getMovies,
  updateMovie,
  deleteMovie,
  getMovie,
  createMovie
} = require('../controllers/movieCotroller')


// router.route("/").get(getMovies);
// router.route("/").post(createMovie)
// router.route("/:id").get(getMovie);
// router.route("/:id").delete(deleteMovie)
// router.route("/:id").put(putMovie)

//the same route shorter way :
router.route("/").get(getMovies).post(createMovie);
router.route("/:id").get(getMovie).delete(deleteMovie).put(updateMovie)




module.exports = router