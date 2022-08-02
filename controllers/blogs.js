//Routes with a similar path are stored here,
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });
  blog.save().then((result) => {
    console.log("successfully saved");
    response.status(200).json(result);
  });
});

module.exports = blogsRouter;
