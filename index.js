import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

mongoose
  .connect('mongodb+srv://datsenkomd:gzR69eNgGTWOPlQZ@cluster0.gang369.mongodb.net/mern_blog?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post('/register', registerValidation, UserController.register);
app.post('/login', UserController.login);
app.get('/me', checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
