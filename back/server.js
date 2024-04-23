const express = require("express");
const cors = require("cors");
require('dotenv').config();
require("colors");
const connectDB = require('./config/db');
const { userRouter } = require("./router/userRouter");
const { postRouter } = require('./router/postRouter');
const { commentRouter } = require("./router/commentRouter");
const path = require('path');
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" folder
const uploadsPath = path.join(__dirname, 'uploads');
// const avatarUploadPath = path.join(__dirname, 'avatars');

app.use('/uploads', express.static(uploadsPath));
// app.use('/avatars', express.static(avatarUploadPath));

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api', commentRouter);

// Connect to the database
connectDB();

// Listen to the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The server is running on port ${port}`.cyan));