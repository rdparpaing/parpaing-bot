const { MessageEmbed } = require("discord.js");

module.exports = async (op, message, supabase) => {
  var scd = (await supabase.from("srs").select("discord_id,rating")).data;
  if (scd.length == 0) {
    message.react("❌");
    return;
  }
  scd = scd
    .sort((a, b) => (b.rating - a.rating) * op)
    .slice(0, scd.length >= 5 ? 5 : scd.length);
  let embed = new MessageEmbed()
    .setTitle(op < 0 ? "**SRS**: Pire citoyens" : "**SRS**: Meilleurs citoyens")
    .setColor("GREEN")
    .setAuthor("Social RdP System", "https://i.imgur.com/dSl4OCN.png")
    .setDescription(
      op < 0
        ? "Voici les 5 pire citoyens du régime"
        : "Voici les 5 meilleurs citoyens du régime"
    )
    .setFooter("Gloire au régime.");
  for (i in scd) {
    embed.addField(
      `**${Number(i) + 1}${i == 0 ? "ᵉʳᵉ" : "ᵉᵐᵉ"} place:**`,
      `<@${scd[i].discord_id}> avec **${scd[i].rating}** points de SC.`
    );
  }
  message.channel.send({
    embeds: [embed],
    allowedMentions: [],
  });
};
