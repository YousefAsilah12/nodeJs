const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dataPath = path.resolve(__dirname, '../../db/users');
const mongoose = require('mongoose');
const User = require("../model/User")
require('dotenv').config()

const loginUser = async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  try {
    // Read user data from file
    const userData = fs.readFileSync(dataPath, 'utf8');
    const users = JSON.parse(userData);

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      res.statusCode = 404;
      throw new Error('User not found');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.statusCode = 404;
      throw new Error('Invalid password');
    }

    // Generate JWT token
    const token = jwt.sign({
        userId: user.id,
        type: user.type
      },
      process.env.JWTSECRET, {
        expiresIn: '5m'
      }
    );

    // Set JWT token as a cookie in the response
    res.cookie('jwt', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 60 * 1000) // expires in 5 minutes
    });

    res.json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};



//@desc get all users
//@route Get /api/users
//@access public
const getUsers = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.status(200).json({
    data
  });
};

//@desc create users
//@route POST /api/users
//@access public
const addUser = async (req, res, next) => {
  const {
    userName,
    password,
    email
  } = req.body;
  try {
    if (!email || !password || !userName) {
      res.status(400);
      throw new Error("all fields are required")
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)

      try {
        const newUser = new User({
          userName: userName,
          email: email,
          password: hashedPassword,
          type: "user"
        })
        console.log(newUser);
        await newUser.save()
        res.status(201).json({
          message: "created user successfully",
          newUser: newUser
        })
      } catch (e) {
        if (e.code === 11000) {
          res.status(400)
          throw new Error(e.message);
        } else {
          res.status(500).json({
            message: "failed to create user"
          });
        }
      }
    }
  } catch (err) {
    next(err)
  }
};

//@desc update a user
//@route PUT /api/users/:id
//@access public
const putUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result=await User.replaceOne({_id:id},req.body)
    if(!result) throw new Error ("cannot be updated")
    console.log(result);
    res.status(200).json({
      message: "updated user"
    });
  } catch (error) {
    next(error);
  }
};

//@desc get a user
//@route GET /api/users/:id
//@access public
const getUser = async (req, res, next) => {

  try {

    try {
      const {
        id
      } = req.params
      const user = await User.findById(id)
      res.status(200).json(user);
    } catch (e) {
      res.status(404);
      throw new Error(e.message);
    }

  } catch (e) {
    next(e)
  }
};

//@desc delete a user
//@route DELETE /api/users/:id
//@access public
const deleteUser = (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const id = parseInt(req.params.id);
  const user = data.find(d => d.id === id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const index = data.indexOf(user);
  data.splice(index, 1);
  fs.writeFileSync(dataPath, JSON.stringify(data));
  console.log(`deleted user ${id}`);
  res.status(200).json({
    message: `deleted user ${id}`
  });
};

module.exports = {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  putUser,
  loginUser
};