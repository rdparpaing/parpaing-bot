const { Express } = require("express");
const otherControllers = require("../controllers/other");

/**
 * Creates API routes for posts API.
 * @param {Express} app
 */
module.exports = (app) => {
  // Get the truck for the quiz on rdparpaing.github.io
  app.get("/website/quiz", otherControllers.answerQuiz);

  // Ping
  app.get("/ping", otherControllers.ping);
};
