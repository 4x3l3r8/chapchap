const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors")
const morgan = require("morgan");

// required files
const connectDB = require("./config/db");
const userRoute = require("./routes/usersRouter");
const authRoute = require("./routes/authRouter");
const postRoute = require("./routes/postRouter");
const errorController = require("./controllers/errorController")

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


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use(errorController);



app.listen(PORT, () => {
    console.log(`Backend server is running on port: ${PORT}`);
})