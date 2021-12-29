//App Config
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

//Routage
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/tweets");

//Dotenv Config
dotenv.config();

//Connexion to MongoDB Server
const uri = 'mongodb+srv://user:pass@albctwitter.mdaoh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//Connexion to Mongoose else error
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

//Middleware
app.get("/",(req,res)=>{
    res.send("Welcome to ALBC Project");
})
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Redirecting
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

//App listener
app.listen(9000, () => {
  console.log("Backend server is running!");
});