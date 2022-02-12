const Discord = require("discord.js");
const { SupabaseClient } = require("@supabase/supabase-js");

/**
 * Deletes a post.
 * @param {Discord.Message} message
 * @param {SupabaseClient} supabase
 */
module.exports = async (message, supabase) => {
  const id = message.content.slice(2);
  const tag = (
    await supabase
      .from("archive")
      .select("attachment, comment")
      .eq("id", parseInt(id))
  ).data;
  if (tag.length == 0) {
    message.react("❌");
    return;
  }
  if (tag[0].attachment) {
    m = await message.channel.send({
      content: `Êtes vous sûr·e de vouloir supprimer ce post ?\n> ${
        tag[0].comment || ""
      }`,
      files: [tag[0].attachment],
    });
  } else {
    m = await message.channel.send(
      `Êtes vous sûr·e de vouloir supprimer ce post ?\n> ${
        tag[0].comment || ""
      }`
    );
  }
  filter = (reaction, user) =>
    user.id == message.author.id && ["✅", "❌"].includes(reaction.emoji.name);
  m.react("✅")
    .then(m.react("❌"))
    .then(
      m
        .awaitReactions({
          filter,
          max: 1,
          time: 30000,
        })
        .then(async (collected) => {
          const reaction = collected.first();
          if (reaction.emoji.name == "✅") {
            m.delete();
            const res = await supabase
              .from("archive")
              .delete()
              .eq("id", parseInt(id) || 0);
            if (res.statusText != "OK") {
              message.react("❌");
            } else {
              message.react("✅");
            }
          } else {
            message.react("❌");
            m.delete();
          }
        })
        .catch(() => {
          m.react("❌");
          m.delete();
        })
    );
};
