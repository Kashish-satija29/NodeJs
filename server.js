const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
 
  module.exports = app;

const connectDB = require('./db');
require('dotenv').config();
connectDB();
const userRouter = require('./routes/users');
app.use('/api',userRouter);

const authRouter = require('./routes/auth');
app.use('/api', authRouter);

const postRouter = require('./routes/post');
app.use('/api',postRouter);