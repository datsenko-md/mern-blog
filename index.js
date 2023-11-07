import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
  .connect('mongodb+srv://datsenkomd:gzR69eNgGTWOPlQZ@cluster0.gang369.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB OK'))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
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
