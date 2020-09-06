const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const postings = require("./routes/api/postings");
const profile = require("./routes/api/profile");
const requests = require("./routes/api/requests");
// const requests = require("./routes/api/requests");
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport')(passport);
const path = require("path");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use("/api/profile", profile);
app.use("/api/users", users);
app.use("/api/postings", postings);
app.use("/api/requests", requests);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}