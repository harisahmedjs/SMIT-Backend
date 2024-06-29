import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt.mjs';

const { Schema } = mongoose;

const userSchema = new Schema({
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: {
    default: [],
    type: []
}

});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('Password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.Password, salt);
    user.Password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});


userSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compareSync(password, user.Password);
};

userSchema.methods.generateToken = function () {
  const { _id } = this;
  const token = jwt.sign({ _id }, jwtSecret);
  return token;
};

const Users = mongoose.model('Users', userSchema);

export default Users;
