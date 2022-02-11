const { Request, Response } = require("express");
const axios = require("axios").default

/**
 * Gets post by id/alias.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.create = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", '*')
  try {  
    axios.post(process.env.TICKETS_WEBHOOK_URL, {
      username: "New " + (req.query.q2.slice(1).toLowerCase() == "Other (describe in question 3)" 
        ? "demand"
        : req.query.q2.slice(1).toLowerCase()),
      embeds: [{
        title: "New ticket created for product __" + req.query.q1.slice(1) + "__",
        type: "rich",
        description: req.query.q3
      }],
      allowed_mentions: []
    }).then(() => {
      res.send("OK")
    }).catch(() => {
      res.send("Not OK")
    })
  } catch (err) {
    console.log(err)
    res.send("Not OK")
  }
}