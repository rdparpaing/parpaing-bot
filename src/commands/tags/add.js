const Discord = require("discord.js");
const { SupabaseClient } = require("@supabase/supabase-js");
const axios = require("axios").default;

/**
 * Adds a post.
 * @param {Discord.Message} message
 * @param {SupabaseClient} supabase
 * @param {Discord.TextChannel} uploadChannel
 */
module.exports = async (message, supabase, uploadChannel) => {
  const tag = message.content.slice(2).split(" ")[0];
  if (tag == "ldm") {
    message.react("❌");
  }
  const comment = message.content.split(" ").slice(1).join(" ");
  if (
    message.mentions.everyone ||
    message.mentions.users.size > 0 ||
    message.mentions.channels.size > 0
  ) {
    message.react("❌");
    return;
  }
  if (message.attachments.size > 0) {
    const response = await axios.get(message.attachments.first().attachment, {
      responseType: "arraybuffer",
    });
    let m = await uploadChannel.send({
      files: [
        new Discord.MessageAttachment(
          Buffer.from(response.data, "utf-8"),
          message.attachments.first().name
        ),
      ],
    });
    res = await supabase.from("archive").insert({
      tag,
      comment,
      attachment: m.attachments.first().attachment,
    });
  } else {
    if (message.content.replace(/[\s\n\*\_\`]+/gi, "") == "+" + tag) {
      message.react("❌");
      return;
    } else {
      res = await supabase.from("archive").insert({
        tag,
        comment,
      });
    }
  }
  if (res.statusText != "Created") {
    message.react("❌");
  } else {
    message.channel.send(
      "✅ Votre post a été créé avec l'ID **" + res.data[0].id + "** !"
    );
  }
};