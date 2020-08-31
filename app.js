const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const postings = require("./routes/api/postings");
const bodyParser = require('body-parser');
const passport = require('passport');
// require('./config/passport')(passport);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);
app.use("/api/postings", postings);

const port = process.env.PORT || 5000;

// window.logout = 

app.listen(port, () => console.log(`Server is running on port ${port}`));