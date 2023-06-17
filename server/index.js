const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const bodyParser = require("body-parser");
require('dotenv').config()

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

app.post("/shortUrl", async (req, res) => {
  const check = await ShortUrl.create({ full: req.body.fullUrl });
  res.send({ ...req.body, shortUrl: check.short });
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
