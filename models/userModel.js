const { Schema, model } = require('mongoose');
const { userRoles } = require('../constans/userRols');

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: Number,
    role: {
      type: String,
      enum: Object.values(userRoles), // ['admin', 'user', 'moderator'],
      default: userRoles.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model('user', user);

module.exports = {
  User,
};
