const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { userRoles } = require('../constans/userRols');

const userSchema = new Schema(
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

// Pre-save hook fires on "save" and "create" methods.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// const isPasswordValid = await bcrypt.compare('Pass_1234', passwordHash);
userSchema.methods.checkUserPassword = (candidate, passwordHash) =>
  bcrypt.compare(candidate, passwordHash);

const User = model('user', userSchema);

module.exports = {
  User,
};
