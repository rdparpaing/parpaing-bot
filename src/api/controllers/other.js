const { Request, Response } = require("express");
const axios = require("axios").default;
const { trucks, redirects } = require("../../constants.json");

/**
 * Gets post by id/alias.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.answerQuiz = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    const userQuiz = req.query.quiz.split("");
    differences = Array(trucks.length).fill(0);
    for (let i in userQuiz) {
      for (let j in trucks) {
        differences[j] += (Number(userQuiz[i]) - trucks[j][0][i]) ** 2;
      }
    }
    const closest = trucks[differences.indexOf(Math.min(...differences))];
    res.send(closest[1][Math.floor(Math.random() * closest[1].length)]);
  } catch (err) {
    res.send("error");
  }
};

module.exports.ping = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(Date.now())
}