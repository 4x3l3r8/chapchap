const express = require("express");
const app = express();

// === required libraries and initialization
// socket.io init
const { createServer } = require("http");
const socketUtils = require("./utils/socketUtils");

const helmet = require("helmet");
const cors = require("cors")
const morgan = require("morgan");

// required files
const connectDB = require("./config/db");
const userRoute = require("./routes/usersRouter");
const authRoute = require("./routes/authRouter");
const postRoute = require("./routes/postRouter");
const uploadRoute = require("./routes/uploadRouter");
const conversationRouter = require("./routes/conversationRouter");
const messageRouter = require("./routes/messageRouter");
const errorController = require("./controllers/errorController");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


connectDB()

const PORT = process.env.PORT || 8800;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

// http init
const httpServer = createServer(app);

// ws init (exported to be used in socket middleware)
const io = socketUtils.sio(httpServer)

// socket.io attachment to all requests
app.all("*", (req, res, next) => {
    req.io = io;
    next();
})


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

app.use(errorController);



// ws connect
socketUtils.connection(io)

// server listen
httpServer.listen(PORT, () => {
    console.log(`Backend server is running on port: ${PORT}`);
})