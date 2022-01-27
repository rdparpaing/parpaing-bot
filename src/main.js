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

var uploadChannel;
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  uploadChannel = await client.channels.fetch("931558530522177566");
  if (process.argv.indexOf("maintenance")) {
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
    });
  }
});

client.on("messageCreate", async (message) => {

  if (
    message.content.startsWith("g--") &&
    !message.content.startsWith("g-- ")
  )
    {deleteGroup(message, supabase)}
  else if (
    message.content.startsWith("g-") &&
    !message.content.startsWith("g- ")
  )
    {remove(message, supabase)}
  else if (
    message.content.startsWith("g>") &&
    !message.content.startsWith("g> ")
  )
    {get(message, supabase)}
  else if (
    message.content.startsWith("g..") &&
    !message.content.startsWith("g.. ")
  ) {
    {randomFromGroup(message, supabase)}
  } else if (
    message.content.startsWith("g.") &&
    !message.content.startsWith("g. ")
  )
    {random(message, supabase)}
  else if (
    message.content.startsWith("gl.") &&
    !message.content.startsWith("gl. ")
  )
    {list(message, supabase)}
  else if (
    message.content.startsWith("g++") &&
    !message.content.startsWith("g++ ")
  )
    {createGroup(message, supabase)}
  else if (message.content.startsWith("g+") && !message.content.startsWith("g+ "))
    {add(message, supabase, uploadChannel)}
  else if (message.content.startsWith("g!help"))
    {help(
      message,
      message.member.displayColor,
      message.content.split(" ").slice(1)
    )}
  else if (message.content.startsWith("g!list")) glist(message, supabase);

});

client.login(process.env.TOKEN);
