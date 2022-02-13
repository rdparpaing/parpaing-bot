const { Express } = require("express");
const otherControllers = require("../controllers/other");

/**
 * Creates API routes for posts API.
 * @param {Express} app
 */
module.exports = (app) => {
  // Create a ticket for 3-questions 
  app.post("/tickets/create", otherControllers.createTicket)

  // Get the truck for the quiz on rdparpaing.github.io
  app.get("/website/quiz", otherControllers.answerQuiz)
}