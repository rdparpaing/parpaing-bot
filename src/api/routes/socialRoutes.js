const { Express } = require("express");
const social = require("../controllers/social");

/**
 * Creates API routes for posts API.
 * @param {Express} app
 */
module.exports = (app) => {
  // Get list of users
  app.get("/social/list", social.list);
  // Get user
  app.get("/social/user/:id", social.get);
};
