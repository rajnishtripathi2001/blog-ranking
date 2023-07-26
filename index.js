// Importing Required Modules
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Blogs = require("./Models/Blog");
const Ranking = require("./Models/Ranking");

// Creating Express App
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

// Clear the ranking collection
function clearRanks() {
  Ranking.deleteMany().then(() => {
    console.log("Ranking collection cleared");
  });
  return;
}

// Rank the blogs
function rankBlogs(blogs) {
  // Calculate the score for each blog
  const weightViews = 0.5;

  for (const blog of blogs) {
    blog.score = blog.view * weightViews;
  }

  blogs.sort((a, b) => b.score - a.score);

  var rank = 0;

  for (var i = 0; i < blogs.length; i++) {
    Ranking.create({
      blogId: blogs[i].blogId,
      rank: rank + 1,
    });
    // console.log(blogs[i].blogId, rank + 1)
    rank = rank + 1;
  }
  console.log("Ranking collection updated");

  // Return the ranked blogs
  return blogs;
}

// Routes

// get the home page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get the blogs
app.get(process.env.GET_ALL_BLOGS, (req, res) => {
  clearRanks();
  Blogs.find()
    .then((blogs) => {
      var rankedBlogs = rankBlogs(blogs);
      res.send(rankedBlogs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving blogs.",
      });
    });
});

// add a new blog
app.post(process.env.ADD_BLOG, async (req, res) => {
  const blog = await Blogs.create(req.body);
  res.status(201).json({
    success: true,
    blog,
  });
});

// update number of views
app.put(process.env.UPDATE_BLOG, async (req, res) => {
  let blog = await Blogs.findById(req.params.id);

  blog = await Blogs.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    success: true,
    blog,
  });
});

// listening to the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
