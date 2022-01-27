const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = async (message, supabase, uploadChannel) => {
  const tag = message.content.slice(2).split(" ")[0];
  if (tag == "*") {
    message.react(":x:")
  };
  const comment = message.content.split(" ").slice(1).join(" ");
  if (
    message.mentions.everyone ||
    message.mentions.users.size > 0 ||
    message.mentions.channels.size > 0
  ) {
    message.reply(":x: Vous ne pouvez pas ping quelqu'un ou quelque chose !");
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
          `file.${message.attachments.first().contentType.split("/")[1]}`
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
      message.channel.send(
        ":x: Mettez un commentaire ou une pièce-jointe pour poster !"
      );
      return;
    } else {
      res = await supabase.from("archive").insert({
        tag,
        comment,
      });
    }
  }
  if (res.statusText != "Created") {
    message.channel.send(":x: Une erreur est survenue.")
  } else {
    message.channel.send("✅ Votre post a été créé avec l'ID **" + res.data[0].id +  "** !");
  }
};
