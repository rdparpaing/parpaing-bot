const { Express } = require("express");
const ticketsController = require("../controllers/tickets");

/**
 * Creates API routes for posts API.
 * @param {Express} app
 */
module.exports = (app) => {
  app.post("/tickets/create", ticketsController.create)
}