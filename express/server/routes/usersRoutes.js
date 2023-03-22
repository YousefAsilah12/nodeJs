const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')
const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  putUser,
  loginUser
} = require('../controllers/usersController')


// router.route("/").get(getMovies);
// router.route("/").post(createMovie)
// router.route("/:id").get(getMovie);
// router.route("/:id").delete(deleteMovie)
// router.route("/:id").put(putMovie)

//the same route shorter way :
router.route("/login").post(loginUser)
router.route("/").get(getUsers).post(addUser);

// router.use(auth)
router.route("/:id").get(getUser).delete(deleteUser).put(putUser)



module.exports = router