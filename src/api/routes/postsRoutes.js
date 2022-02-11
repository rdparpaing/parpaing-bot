const { Express } = require("express");
const postController = require("../controllers/postsRead");

/**
 * Creates API routes for posts API.
 * @param {Express} app
 */
module.exports = (app) => {
  // Get post by ID / by alias
  app.get("/posts/get/:id", postController.get);
  // Get posts IDs list from tag
  app.get("/posts/l/tag/:tag", postController.idlist);
  // Get all tags from group
  app.get("/posts/l/group/:group", postController.tagslist);
  // Get groups list
  app.get("/posts/l/", postController.groupsList);
  // Get all posts from tag
  app.get("/posts/tags/:tag", postController.getAllFromTag);
  // Get random post from tag
  app.get("/posts/r/tag/:tag", postController.getRandomFromTag);
  // Get random post
  app.get("/posts/r/", postController.getRandom);
  // Get random post from group
  app.get("/posts/r/group/:group", postController.getRandomFromGroup);

  // Create post
  app.post("/posts/create/:tag");
  // Delete post
  app.delete("/post/delete/:id");
  // Update post
  app.patch("/posts/update/:id");
  // Rate post
  app.patch("/posts/rate/:id");
  // Create alias
  app.patch("/posts/alias/");
};
