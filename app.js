const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require('./config/keys_prod').mongoURI;
const users = require("./routes/api/users");
const postings = require("./routes/api/postings");
const bodyParser = require('body-parser');
const path = require("path");
const passport = require('passport');
require('./config/passport')(passport);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/public"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
  });
}
app.use("/api/users", users);
app.use("/api/postings", postings);