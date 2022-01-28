const { MessageEmbed } = require("discord.js");

module.exports = (message, color, argv) => {
  let embed = new MessageEmbed();
  if (argv == "tags") {
    embed
      .setTitle("Aide de ParpaingBot")
      .setColor(color)
      .setDescription("Voici comment utiliser les tags !")
      .addFields([
        {
          name: "Créer un tag/Ajouter un élément à un tag",
          value:
            "``g+<tag> <commentaire>``\n" +
            ". Une pièce jointe est autorisée. \nles pings ne sont pas autorisés.",
        },
        {
          name: "Supprimer un élément",
          value: "``g-<id>``",
        },
        {
          name: "Lire un élément aléatoire d'un tag",
          value: "``g.<tag>``",
        },
        {
          name: "Lire un élément avec son id",
          value: "``g><id>``",
        },
        {
          name: "Lister les ids d'un tag",
          value: "``gl.<tag>``",
        },
        {
          name: "Noter un tag (nombre entière entre 0 et 5)",
          value: "``gr.<tag> <rating>``",
        },
      ])
      .setTimestamp(Date.now())
      .setFooter("Fait par Cookie", "https://i.imgur.com/jDCbugp.png");
  } else if (argv == "groupes") {
    embed
      .setTitle("Aide de ParpaingBot")
      .setColor(color)
      .setDescription("Voici comment utiliser les groupes !")
      .addFields([
        {
          name: "Créer un groupe/Modifier un groupe",
          value:
            "``g++<nom> <tag1> <tag2>``\n" +
            ". Recréer un groupe sous le même nom va remplacer le groupe.",
        },
        {
          name: "Supprimer un groupe",
          value: "``g--<id>``",
        },
        {
          name: "Lire un élément aléatoire d'un groupe",
          value: "``g..<tag>``",
        },
      ])
      .setTimestamp(Date.now())
      .setFooter("Fait par Cookie", "https://i.imgur.com/jDCbugp.png");
  } else {
    embed
      .setTitle("Aide de ParpaingBot")
      .setColor(color)
      .setDescription("Voici comment utiliser le bot !")
      .addFields([
        {
          name: "Rubriques",
          value: "``tags``, ``groupes`` (ex ``g!help tags``)",
        },
        {
          name: "Lister les groupes/tags",
          value:
            "``g!list`` lister les groupes\n``g!list <groupe>`` lister les tags d'un groupe",
        },
      ])
      .setTimestamp(Date.now())
      .setFooter("Fait par Cookie", "https://i.imgur.com/jDCbugp.png");
  }
  message.channel.send({
    embeds: [embed],
  });
};
