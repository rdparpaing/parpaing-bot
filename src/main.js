require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const { Client } = require("discord.js");
const Discord = require("discord.js");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
});

const app = require("express")();

app.get("/", (req, res) => {
  res.status(200).json({status: "ok"})
})

app.listen(process.env.PORT || 8080, () => {
  console.log("Serveur à l'écoute")
})

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

const add = require("./commands/add")
const remove = require("./commands/remove")
const random = require("./commands/random")
const list = require("./commands/list")
const get = require("./commands/get");
const help = require("./commands/help");

var uploadChannel;
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  uploadChannel = await client.channels.fetch("931558530522177566");
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("+") && !message.content.startsWith("+ ")) add(message, supabase, uploadChannel)
  else if (message.content.startsWith("->") && !message.content.startsWith("-> ")) get(message, supabase)
  else if (message.content.startsWith("-") && !message.content.startsWith("- ")) remove(message, supabase)
  else if (message.content.startsWith(".") && !message.content.startsWith(". ")) random(message, supabase)
  else if (message.content.startsWith("l.") && !message.content.startsWith("l. ")) list(message, supabase)
  else if (message.content.startsWith("g!help")) help(message, message.member.displayColor)
});

client.login(process.env.TOKEN);
