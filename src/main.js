require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const { Client, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
  ],
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
const rate = require("./commands/rate");
const createAlias = require("./commands/createAlias");
const update = require("./commands/update");
const updatet = require("./commands/updatet");
const ldm = require("./commands/ldm");
const social = require("./commands/social");

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
  if (message.author.bot) return;
  if (/(^|[\s:])(pg)(pg+)?([\s:]|$)/g.test(message.content.toLowerCase())) {
    console.log("pg")
    social(supabase, message.author.id, -2);
  } else if (/(\s|\n|^)feur|ssonneuse|bril/gmi.test(message.content.toLowerCase())) {
    social(supabase, message.author.id, -1);
  }
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
    rate(message, supabase);
  } else if (message.content.split(" ")[0] == "g!alias") {
    createAlias(message, supabase);
  } else if (
    message.content.startsWith("gu.") &&
    !message.content.startsWith("gu. ")
  ) {
    update(message, supabase);
  } else if (
    message.content.startsWith("gut.") &&
    !message.content.startsWith("gut. ")
  ) {
    updatet(message, supabase);
  } else if (message.content.split(" ")[0] == "g!ldm") {
    ldm(message, supabase);
  } else if (message.content.split(" ")[0] == "g!meilleurs") {
    var scd = (await supabase.from("srs")
      .select('discord_id,rating')).data
    if (scd.length == 0) {
      message.react("❌")
      return;
    }
    scd = scd.sort((a, b) => b.rating - a.rating).slice(0, scd.length >= 5 ? 5 : scd.length)
    let embed = new MessageEmbed()
      .setTitle("**SRS**: Meilleurs citoyens")
      .setColor("GREEN")
      .setAuthor("Social RdP System", "https://i.imgur.com/dSl4OCN.png")
      .setDescription("Voici les 5 meilleurs citoyens du régime")
      .setFooter("Gloire au régime.")
    for (i in scd) {
      embed.addField(`**${(Number(i)+1)}${(i == 0) ? "ᵉʳᵉ" : "ᵉᵐᵉ"} place:**`, `<@${scd[i].discord_id}> avec **${scd[i].rating}** points de SC.`)
    }
    message.channel.send({
      embeds: [embed],
      allowedMentions: [] 
    })
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.name == "⭐" && reaction.count == 4) {
    social(supabase, user.id, 4);
  } else if (reaction.name == "⭐" && reaction.count == 10) {
    social(supabase, user.id, 8);
  }
  if (reaction.name == "♻️" && reaction.count == 4) {
    social(supabase, user.id, -4);
  } else if (reaction.name == "♻️" && reaction.count == 10) {
    social(supabase, user.id, -8);
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (reaction.name == "⭐" && reaction.count == 3) {
    social(supabase, user.id, -4);
  } else if (reaction.name == "⭐" && reaction.count == 9) {
    social(supabase, user.id, -8);
  }
  if (reaction.name == "♻️" && reaction.count == 3) {
    social(supabase, user.id, 4);
  } else if (reaction.name == "♻️" && reaction.count == 9) {
    social(supabase, user.id, 8);
  }
});

client.login(process.env.TOKEN);
