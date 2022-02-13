const { Request, Response } = require("express");
const axios = require("axios").default
const { trucks } = require("../../constants.json")

/**
 * Gets post by id/alias.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.createTicket = async (req, res) => {
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

/**
 * Gets post by id/alias.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.answerQuiz = async (req, res) => {
  try {
    const userQuiz = req.query.quiz.split("")
    differences = Array(trucks.length).fill(0)
    for (let i in userQuiz) {
      for (let j in trucks) {
        differences[j] += (Number(userQuiz[i]) - trucks[j][0][i]) ** 2
      }
    }
    const closest = trucks[differences.indexOf(Math.min(...differences))]
    res.send(closest[1][Math.floor(Math.random() * closest[1].length)])
  } catch (err) {
    res.send("error")
  }
}