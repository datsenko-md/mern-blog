import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';

mongoose
  .connect('mongodb+srv://datsenkomd:gzR69eNgGTWOPlQZ@cluster0.gang369.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  }

  const { password } = req.body;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    passwordHash,
  });

  const user = await doc.save();

  res.json({
    user,
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: 'Vasya Pupkin',
    },
    'secret123',
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
