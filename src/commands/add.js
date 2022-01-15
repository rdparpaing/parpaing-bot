const axios = require("axios").default;
const Discord = require("discord.js")

module.exports = async (message, supabase, uploadChannel) => {
    const tag = message.content.slice(1).split(" ")[0];
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
      if (!comment.replace(/\s/gi, "")) {
        message.reply(":x: Mettez un commentaire ou une pièce-jointe pour poster !")
      } else {
        res = await supabase.from("archive").insert({
          tag,
          comment,
        });
      }
    }
    if (res.statusText != "Created") {
      message.channel.send(":x: Une erreur s'est produite.");
    } else {
      message.channel.send("✅ Votre tag a été créé !");
    }
  }