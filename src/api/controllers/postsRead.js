const { Request, Response } = require("express");
const { supabase } = require("../../main");
const { checkAuth } = require("./auth");
const { isNull } = require("underscore");
const _ = require("underscore");

/**
 * Gets post by id/alias.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.get = async (req, res) => {
  if (!checkAuth(req.query.auth, "POSTSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  if (isNaN(parseInt(req.params.id))) {
    _res = await supabase
      .from("archive")
      .select("id,comment,attachment,rating,tag,alias")
      .eq("alias", req.params.id);
  } else {
    _res = await supabase
      .from("archive")
      .select("id,comment,attachment,rating,tag,alias")
      .eq("id", req.params.id);
  }
  if (!_res) {
    res.status(500).json({});
    return;
  }
  if (isNull(_res.data)) {
    res.status(404).json({});
    return;
  }
  if (_res.data.length > 0) {
    const tag = _res.data[0];
    res.status(200).json(tag);
  } else {
    res.status(200).json({});
    return;
  }
};

/**
 * Get posts IDs list from tag.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.idlist = async (req, res) => {
  if (!checkAuth(req.query.auth, "POSTSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  const _res = await supabase
    .from("archive")
    .select("id")
    .eq("tag", req.params.tag);
  if (_res.data.length > 0) {
    const list = _res.data.map((i) => i.id);
    res.status(200).json(list);
  } else {
    res.status(200).json([]);
  }
};

/**
 * Get tags list from group.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.tagslist = async (req, res) => {
  if (!checkAuth(req.query.auth, "POSTSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  const _res1 = await supabase
    .from("groups")
    .select("tags")
    .eq("name", req.params.group);
  if (_res1.data.length > 0) {
    const _res2 = await supabase
      .from("archive")
      .select("id, tag, comment, attachment,rating,alias")
      .in("tag", _res1.data[0].tags);
    if (_res2.data.length > 0) {
      let tagcount = {};
      for (let i in _res2.data) {
        tagcount[_res2.data[i].tag] = (tagcount[_res2.data[i].tag] || 0) + 1;
      }
      res.status(200).json(tagcount);
    } else {
      res.status(200).json({});
    }
  } else {
    res.status(200).json({});
  }
};

/**
 * Get list of group.
 * @param {Request} req
 * @param {Response} res
 */
module.exports.groupsList = async (req, res) => {
  if (!checkAuth(req.query.auth, "POSTSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  const res1 = await supabase.from("groups").select("name,tags");
  const res2 = await supabase.from("archive").select("tag");
  let tagslist = _.uniq(res2.data.map((i) => i.tag));
  groupedtagslist = _.union(...res1.data.map((i) => i.tags));
  let groups = res1.data.map((i) => i.name);
  let ungrouped = _.difference(tagslist, groupedtagslist);

  s = {};
  for (let i in groups) {
    s[groups[i]] = res1.data[i].tags.length;
  }
  s["ungrouped"] = ungrouped.length;
  res.status(200).json(s);
};

/**
 * Get all posts from tag
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
module.exports.getAllFromTag = async (req, res) => {
  if (!checkAuth(req.query.auth, "POSTSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  const _res = await supabase
    .from("archive")
    .select("id,comment,attachment,rating,alias")
    .eq("tag", req.params.tag);
  res.status(200).json(_res.data);
};

/**
 * Get random post from tag
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
module.exports.getRandomFromTag = async (req, res) => {
  if (!checkAuth(req.query.auth, "POSTSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  const _res = await supabase
    .from("archive")
    .select("id,comment,attachment,rating,tag")
    .eq("tag", req.params.tag);
  if (_res.data.length > 0) {
    const post = _res.data[Math.floor(Math.random() * _res.data.length)];
    res.status(200).json(post);
  } else {
    res.status(200).json({});
  }
};

/**
 * Get random post
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
module.exports.getRandom = async (req, res) => {
  if (!checkAuth(req.query.auth, "POSTSAPI_READ")) {
    res.status(401).json({});
    return;
  }
  const _res = await supabase
    .from("archive")
    .select("id,comment,attachment,rating,tag");
  if (_res.data.length > 0) {
    const post = _res.data[Math.floor(Math.random() * _res.data.length)];
    res.status(200).json(post);
  } else {
    res.status(200).json({});
  }
};

/**
 * Get random post from group
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
module.exports.getRandomFromGroup = async (req, res) => {
  const res1 = await supabase
    .from("groups")
    .select("tags")
    .eq("name", req.params.group);
  if (res1.data.length > 0) {
    const res2 = await supabase
      .from("archive")
      .select("id, tag, comment, attachment, rating")
      .in("tag", res1.data[0].tags);
    if (res2.data && res2.data.length > 0) {
      const post = res2.data[Math.floor(Math.random() * res2.data.length)];
      res.status(200).json(post);
    } else {
      res.status(200).json({});
    }
  } else {
    res.status(200).json({});
  }
};
