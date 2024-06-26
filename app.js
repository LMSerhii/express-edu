const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const { authRouter } = require('./routes/authRouter');
const { userRouter } = require('./routes/userRouter');

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

app.use(`${pathPrefix}/auth`, authRouter);
app.use(`${pathPrefix}/users`, userRouter);

// ============= Error handler =========

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/users',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Server error', data } = err;
  res.status(status).json({
    status,
    message,
    data,
  });
});

// DB connection + Server connection

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_URI;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log('DB conected ...');
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
