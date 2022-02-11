const { MessageEmbed } = require("discord.js");
const { version } = require("../../package.json");

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
          value: "``gr.<id> <rating>``",
        },
        {
          name: "Mettre à jour le commentaire d'un élément",
          value: "``gu.<id> <commentaire>``",
        },
        {
          name: "Mettre à jour le tag d'un élément",
          value: "``gut.<id> <tag>``",
        },
      ])
      .setTimestamp(Date.now())
      .setFooter("Cankyre, v." + version, "https://i.imgur.com/45iXrNN.png");
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
      .setFooter("Cankyre, v." + version, "https://i.imgur.com/45iXrNN.png");
  } else if (argv == "posts_read") {
    embed
      .setTitle("Aide de ParpaingBot")
      .setColor(color)
      .setDescription(
        "URL de base: `https://parpaing-bot.thatcookie.repl.co`\n" +
          "⚠ toujours ajouter ``?auth=<MDP>`` à la fin de l'URL\n(MDPs épinglés dans <#930510670326288404>)"
      )
      .addFields([
        {
          name: "Lire un élément avec son id/alias",
          value: "``/posts/get/:id``",
        },
        {
          name: "Lister les ids d'un tag",
          value: "``/posts/l/tag/:tag``",
        },
        {
          name: "Lister les tags d'un groupe",
          value: "``/posts/l/group/:group``",
        },
        {
          name: "Lister les groupes",
          value: "``/posts/l/``",
        },
        {
          name: "Lire un élément aléatoire",
          value: "``/posts/r/``",
        },
        {
          name: "Lire un élément aléatoire d'un tag",
          value: "``/posts/r/tag/:tag``",
        },
        {
          name: "Lire un élément aléatoire d'un groupe",
          value: "``/posts/r/group/:group``",
        },
        {
          name: "Obtenir tous les posts d'un tag",
          value: "``/posts/tags/:tag``",
        },
      ])
      .setTimestamp(Date.now())
      .setFooter("Cankyre, v." + version, "https://i.imgur.com/45iXrNN.png");
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
        {
          name: "Créer un alias",
          value: "``g!alias <id> <alias>``",
        },
        {
          name: "Ludrole-meter",
          value: "``g!ldm``",
        },
        {
          name: "SRS: Pire/Meilleurs",
          value: "``g!pires``, ``g!meilleurs``",
        },
        {
          name: "Aide pour les APIs",
          value:
            "``g!help <api>`` (api peut être ``posts_read`` (la suite arrive))",
        },
      ])
      .setTimestamp(Date.now())
      .setFooter("Cankyre, v." + version, "https://i.imgur.com/45iXrNN.png");
  }
  message.channel.send({
    embeds: [embed],
  });
};
