const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { userRouter } = require('./routes/userRouter');

dotenv.config();

const app = express();

// ============= MIDDLEWARE ===============

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// built-in
app.use(express.json());
app.use(cors());

// custom global middleware
app.use((req, res, next) => {
  req.time = new Date().toLocaleString();
  next();
});

// ============= Server check ===============

app.get('/ping', (req, res) => {
  res.status(200).json({
    status: 'success',
    msg: 'Pong',
  });
});

// ============= Routes ===============

const pathPrefix = '/api/v1';

app.use(`${pathPrefix}/users`, userRouter);

// ============= Error handler =========

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error', data } = err;
  if (process.env.NODE_ENV === 'development') {
    res.status(status).json({ message, errors: data });
    return;
  }

  res.status(status).json({ message });
});

// ============= Server init ===============

const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
