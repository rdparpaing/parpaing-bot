require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const { Client, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
    "GUILD_VOICE_STATES"
  ],
});
const { Parser } = require("json2csv"),
  parser = new Parser({
    fields: [
      "id",
      "created_at",
      "tag",
      "comment",
      "attachment",
      "rating",
      "whorated",
      "alias",
    ],
  });
const { writeFile } = require("fs");

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
module.exports.supabase = supabase;

if (process.argv.indexOf("api") + 1) {
  const app = require("express")();

  app.get("/", (_, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("Serveur à l'écoute");
  });

  const postRoutes = require("./api/routes/postsRoutes");
  const otherRoutes = require("./api/routes/otherRoutes");
  const socialRoutes = require("./api/routes/socialRoutes");
  app.use(require("body-parser").json());
  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(require("body-parser").raw());
  postRoutes(app);
  otherRoutes(app);
  socialRoutes(app);

  // Communication with CCA
  async function tellApiOnline() {
    const axios = require("axios").default
    try {
      axios.get("https://central-api.thatcookie.repl.co/status/ping", {
        params: {
          auth: process.env.PING_PWD,
          product: "pbot-api",
          ts: Date.now()
        }
      }).catch(console.error)
    } catch (err) {
      console.error(err)
    }
  }

  tellApiOnline()
  setInterval(tellApiOnline, 60000)
}

if (process.argv.indexOf("backup") + 1) {
  (async () => {
    const res = await supabase.from("archive").select("*");
    const csv = parser.parse(res.data);
    writeFile(`./src/data/backup.csv`, csv, () => {
      console.log("backup done!");
    });
  })();
}

if (process.argv.indexOf("bot") + 1) {
  // Tags commands imports
  const add = require("./commands/tags/add");
  const remove = require("./commands/tags/delete");
  const random = require("./commands/tags/random");
  const list = require("./commands/tags/list");
  const get = require("./commands/tags/get");
  const rate = require("./commands/tags/rate");
  const createAlias = require("./commands/tags/createAlias");
  const update = require("./commands/tags/update");
  const updatet = require("./commands/tags/updatet");
  // Groups commands imports
  const createGroup = require("./commands/groups/createGroup");
  const randomFromGroup = require("./commands/groups/randomFromGroup");
  const deleteGroup = require("./commands/groups/deleteGroup");
  const glist = require("./commands/groups/glist");
  // Misc commands imports
  const help = require("./commands/misc/help");
  const ldm = require("./commands/misc/ldm");
  
  // Social commands imports
  const socialRanks = require("./commands/social/socialRanks");
  const social = require("./functions/social");
  const addMsg = require("./functions/addMsg");

  var badCitizens = []
  var words = require('an-array-of-french-words')

  async function fetchBadCitizen() {
    badCitizens = []
    const res = (await supabase.from("srs")
      .select("rating,discord_id")).data
    for (let i in res) {
      if (parseInt(res[i].rating) <= -15) {

        badCitizens.push(res[i].discord_id)
      }
    }
    return badCitizens
  }

  // Communication with CCA
  async function tellBotOnline() {
    const axios = require("axios").default
    try {
      axios.get("https://central-api.thatcookie.repl.co/status/ping", {
        params: {
          auth: process.env.PING_PWD,
          product: "pbot",
          ts: Date.now()
        }
      }).catch(console.error)
      console.log("sednt")
    } catch (err) {
      console.error(err)
    }
  }

  tellBotOnline()
  setInterval(tellBotOnline, 60000)

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
      social(supabase, message.author.id, -2);
    } else if (
      /(\s|\n|^)(ff?eur|ss?onn?euse|bril|ll?iam|stern)/gim.test(
        message.content.toLowerCase()
      )
    ) {
      social(supabase, message.author.id, -1);
      message.channel.send(require("./constants.json").scimg)
    } else {
      addMsg(message.author.id);
    }
    if (
      message.content.startsWith("g--") &&
      !message.content.startsWith("g-- ") &&
      badCitizens.indexOf(message.author.id) + 1 == 0
    ) {
      deleteGroup(message, supabase);
    } else if (
      message.content.startsWith("g-") &&
      !message.content.startsWith("g- ") &&
      badCitizens.indexOf(message.author.id) + 1 == 0
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
      !message.content.startsWith("g++ ") &&
      badCitizens.indexOf(message.author.id) + 1 == 0
    ) {
      createGroup(message, supabase);
    } else if (
      message.content.startsWith("d+") &&
      !message.content.startsWith("g+ ") &&
      badCitizens.indexOf(message.author.id) + 1 == 0
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
      !message.content.startsWith("gr. ") &&
      badCitizens.indexOf(message.author.id) + 1 == 0
    ) {
      rate(message, supabase);
    } else if (message.content.split(" ")[0] == "g!alias") {
      createAlias(message, supabase);
    } else if (
      message.content.startsWith("gu.") &&
      !message.content.startsWith("gu. ") &&
      badCitizens.indexOf(message.author.id) + 1 == 0
    ) {
      update(message, supabase);
    } else if (
      message.content.startsWith("gut.") &&
      !message.content.startsWith("gut. ") &&
      badCitizens.indexOf(message.author.id) + 1 == 0
    ) {
      updatet(message, supabase);
    } else if (message.content.split(" ")[0] == "g!ldm" &&
      badCitizens.indexOf(message.author.id) + 1 == 0) {
      ldm(message, supabase);
    } else if (message.content.split(" ")[0] == "g!meilleurs") {
      socialRanks(1, message, supabase);
    } else if (message.content.split(" ")[0] == "g!pires") {
      socialRanks(-1, message, supabase);
    } else if (message.content.split(" ")[0] == "g!profil") {
      const id = require("./functions/parseId")(message);
      const res = await supabase.from("srs").select("*").eq("discord_id", id);
      if (!res.data.length > 0 || !id) {
        message.react("❌");
        return;
      }
      const embed = new MessageEmbed()
        .setTitle("**SRS**: Profil de citoyen")
        .setColor(res.data[0].rating < 0 ? "RED" : "GREEN")
        .setAuthor("Social RdP System", "https://i.imgur.com/dSl4OCN.png")
        .setDescription(
          `Voici le profil du citoyen <@${res.data[0].discord_id}>`
        )
        .setFooter("Gloire au régime.")
        .addField(
          "Profil n°" + res.data[0].id,
          `Points: ${res.data[0].rating} + ${res.data[0].messages_count}/50`
        );
      message.channel.send({
        embeds: [embed],
        allowedMentions: [],
      });
    }
  });

  async function dcUser() {
    try {
      for (let id in badCitizens){
        const member = await (await client.guilds.fetch("877559214740996176")).members.fetch(badCitizens[id])
        if (member.voice.channel && Math.random() <= 0.25) {
          member.voice.disconnect()
        }
        if (Math.random() <= 0.5) {
          member.setNickname(words[Math.floor(Math.random() * words.length)])
        }
      }
    } catch {

    }
  }

  async function increaseSc() {
    for (let id in badCitizens){
      await social(supabase, badCitizens[id], 1)
    }
    await fetchBadCitizen()
  }

  setInterval(dcUser, 60000)
  setInterval(increaseSc, 3600000)

  fetchBadCitizen()

  client.login(process.env.TOKEN);
}
