const express = require('express');
const router = express.Router();
const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  putUser
} = require('../controllers/usersController')


// router.route("/").get(getMovies);
// router.route("/").post(createMovie)
// router.route("/:id").get(getMovie);
// router.route("/:id").delete(deleteMovie)
// router.route("/:id").put(putMovie)

//the same route shorter way :
router.route("/").get(getUsers).post(addUser);
router.route("/:id").get(getUser).delete(deleteUser).put(putUser)




module.exports = router