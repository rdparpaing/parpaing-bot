const { Request, Response } = require("express");
const { supabase } = require("../../main");
const { checkAuth } = require("./auth");
const { isNull } = require("underscore");
const _ = require("underscore");

/**
 * Gets user by id.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.list = async (req, res) => {
  if (!checkAuth(req.query.auth, "SRSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  try {
    _res = (await supabase.from("srs").select("*")).data.sort((a, b) => (b.rating - a.rating))
    res.json(_res)
  } catch {
    res.json({})
  }
}

/**
 * Gets user by id.
 * @param {Request} req
 * @param {Response} res
 */
 module.exports.get = async (req, res) => {
  if (!checkAuth(req.query.auth, "SRSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  try {
    _res = await supabase.from("srs").select("*").eq("discord_id", req.params.id);
    res.json(_res.data)
  } catch {
    res.json({})
  }
}