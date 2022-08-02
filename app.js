//This is where the whole app lives,
//We are importing different parts of the whole app,
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

//The routes, middleware, logger, and conection config live in their own seperate files
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const config = require("./utils/config");
const logger = require("./utils/logger");

//Call the logger.info function and pass in the parameters from config
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
