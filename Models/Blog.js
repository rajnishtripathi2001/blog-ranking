const mongoose = require('mongoose');

const blogSchema = new  mongoose.Schema({
    blogId: String,
    name: String,
    content: String,
    author: String,
    view: Number
});

const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;