require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const { Client } = require("discord.js");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

const app = require("express")();

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Serveur à l'écoute");
});

const options = {
  schema: "public",
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabase = createClient(
  "https://evbhdnuchmxshtxsoxns.supabase.co",
  process.env.SUPABASE_KEY,
  options
);

const add = require("./commands/add");
const remove = require("./commands/delete");
const random = require("./commands/random");
const list = require("./commands/list");
const get = require("./commands/get");
const help = require("./commands/help");
const createGroup = require("./commands/createGroup");
const randomFromGroup = require("./commands/randomFromGroup");
const deleteGroup = require("./commands/deleteGroup");
const glist = require("./commands/glist");
const { isNull } = require("underscore");

var uploadChannel;
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  uploadChannel = await client.channels.fetch("931558530522177566");
  if (process.argv.indexOf("maintenance") + 1) {
    client.user.setPresence({
      status: "dnd",
    });
    client.user.setActivity({
      name: "MAINTENANCE - g!help",
    });
  } else {
    client.user.setPresence({
      status: "online",
    });
    client.user.setActivity({
      name: "g!help",
      type: "LISTENING",
    });
  }
});

client.on("messageCreate", async (message) => {
  if (
    message.content.startsWith("g--") &&
    !message.content.startsWith("g-- ")
  ) {
    deleteGroup(message, supabase);
  } else if (
    message.content.startsWith("g-") &&
    !message.content.startsWith("g- ")
  ) {
    remove(message, supabase);
  } else if (
    message.content.startsWith("g>") &&
    !message.content.startsWith("g> ")
  ) {
    get(message, supabase);
  } else if (
    message.content.startsWith("g..") &&
    !message.content.startsWith("g.. ")
  ) {
    {
      randomFromGroup(message, supabase);
    }
  } else if (
    message.content.startsWith("g.") &&
    !message.content.startsWith("g. ")
  ) {
    random(message, supabase);
  } else if (
    message.content.startsWith("gl.") &&
    !message.content.startsWith("gl. ")
  ) {
    list(message, supabase);
  } else if (
    message.content.startsWith("g++") &&
    !message.content.startsWith("g++ ")
  ) {
    createGroup(message, supabase);
  } else if (
    message.content.startsWith("g+") &&
    !message.content.startsWith("g+ ")
  ) {
    add(message, supabase, uploadChannel);
  } else if (message.content.startsWith("g!help")) {
    help(
      message,
      message.member.displayColor,
      message.content.split(" ").slice(1)
    );
  } else if (message.content.startsWith("g!list")) glist(message, supabase);
  else if (
    message.content.startsWith("gr.") &&
    !message.content.startsWith("gr. ")
  ) {
    const id = message.content.slice(3).split(" ")[0];
    const rating = parseInt(message.content.slice(3).split(" ")[1]);
    if (isNaN(rating)) {
      message.react("❌");
      return;
    }
    if (rating < 0 || rating > 5) {
      message.react("❌");
      return;
    }
    var post = (
      await supabase.from("archive").select("rating, whorated").eq("id", id)
    ).data;
    if (post.length == 0) {
      message.react("❌");
      return;
    } else post = post[0];
    if (post.whorated.indexOf(message.author.id) + 1) {
      message.react("❌");
      return;
    }
    post.whorated.push(message.author.id);
    if (isNull(post.rating)) {
      post.rating = rating;
    } else {
      post.rating =
        (post.rating * (post.whorated.length - 1) + rating) /
        post.whorated.length;
    }
    post = await supabase.from("archive").update(post).eq("id", id);
    if (post.status == 200) {
      message.react("✅");
    } else {
      message.react("❌");
    }
  } else if (/^(l|delete)?[+.-]+[\w\d]+/.test(message.content)) {
    message.reply(
      ":x: Les anciens préfixs ne fonctionnent plus, regardez `g!help` pour plus d'infos"
    );
  }
});

client.login(process.env.TOKEN);
