const { MessageEmbed } = require("discord.js")

module.exports = (message, color) => {
  let embed = new MessageEmbed()
    .setTitle("Aide de ParpaingBot")
    .setColor(color)
    .setDescription("Voici comment utiliser les tags!")
    .addFields([
      {
        name: "Créer un tag/Ajouter un élément à un tag",
        value: "``+<tag> <commentaire>``\n"
          + ". Une pièce jointe est autorisée. \nles pings ne sont pas autorisés."
      },
      {
        name: "Supprimer un élément",
        value: "``-<id>``"
      },
      {
        name: "Lire un élément aléatoire d'un tag",
        value: "``.<tag>``"
      },
      {
        name: "Lire un élément avec son id",
        value: "``-><id>``"
      },
      {
        name: "Lister les ids d'un tag",
        value: "``l.<tag>``"
      },
    ])
    .setTimestamp(Date.now())
    .setFooter("Fait par Cookie", "https://i.imgur.com/jDCbugp.png")
  message.channel.send({
    embeds: [embed]
  })
}