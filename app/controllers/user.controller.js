import nodemailer from "nodemailer";
import db from "../models/index.js";

const User = db.users;

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phoneNumber
 *               - email
 *               - hobbies
 *             properties:
 *               name:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               hobbies:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: All fields are required
 *       500:
 *         description: Some error occurred while creating the User
 */
export const create = (req, res) => {
  console.log("Req :", req);
  // Validate request
  if (
    !req.body.name ||
    !req.body.phoneNumber ||
    !req.body.email ||
    !req.body.hobbies
  ) {
    res.status(400).send({
      message: "All fields are required!",
    });
    return;
  }

  const user = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    hobbies: req.body.hobbies,
  };
  console.log("userinfo", user);
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some error occurred while retrieving users
 */
export const findAll = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a single user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving User
 */
export const findOne = (req, res) => {
  const id = req.params.id;

  console.log("Inside getbyId and userid is:", id);
  User.findOne({ id: id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "User not found with id " + id,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's information by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User was updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating User
 */
export const update = (req, res) => {
  const id = req.params.id;
  const update = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    hobbies: req.body.hobbies,
  };

  User.findOneAndUpdate({ id: id }, update, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({
          message: `User not found with id ${id}.`,
        });
      }
      res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User was deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Could not delete user
 */
export const remove = (req, res) => {
  const id = req.params.id;

  User.findOneAndDelete({ id: id })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. User not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - phoneNumber
 *         - email
 *         - hobbies
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         hobbies:
 *           type: string
 *           description: The hobbies of the user
 */
