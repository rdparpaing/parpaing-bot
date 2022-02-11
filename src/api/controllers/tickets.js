const { Request, Response } = require("express");
const axios = require("axios").default

/**
 * Gets post by id/alias.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.create = async (req, res) => {
  try {  
    axios.post(process.env.TICKETS_WEBHOOK_URL, {
      username: "New " + (req.body.q2.toLowerCase() == "Other (describe in question 3)" 
        ? "demand"
        : req.body.q2.toLowerCase()),
      embeds: [{
        title: "New ticket created for product __" + req.body.q1 + "__",
        type: "rich",
        description: req.body.q3
      }],
      allowed_mentions: []
    }).then(() => {
      res.send("OK")
    }).catch(() => {
      res.send("Not OK")
    })
  } catch {
    res.send("Not OK")
  }
}