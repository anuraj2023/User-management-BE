import nodemailer from "nodemailer";
import db from "../models/index.js";

const User = db.users;

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

export const SendMail = (req, res) => {
  console.log("email:", process.env.GMAIL_USERNAME);
  console.log("email:", process.env.GMAIL_APP_PASSWORD);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const data = req.body;
  console.log("data", data.emailData);

  let htmlContent = '<table border="1">';
  htmlContent +=
    "<tr><th>Name</th><th>Phone Number</th><th>Email</th><th>Hobbies</th></tr>";
  data.emailData.forEach((item) => {
    htmlContent += `<tr><td>${item.name}</td><td>${item.phoneNumber}</td><td>${item.email}</td><td>${item.hobbies}</td></tr>`;
  });
  htmlContent += "</table>";
  console.log("html Content", htmlContent);

  let mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: process.env.RECIPIENT_USER,
    subject: "Test Email from Node.js",
    html: htmlContent,
  };
  transporter
    .sendMail(mailOptions)
    .then((data) => {
      console.log("email sent");
      res.send(data);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).send({
        message: err.message || "Failed to send mail",
      });
    });
};
