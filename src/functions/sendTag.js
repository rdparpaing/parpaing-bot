const { ludrole } = require("../constants.json");

module.exports = async (message, tag) => {
  if (tag.tag == "ldm") {
    tag.comment = tag.comment.replace("​", "");
    message.channel.send({
      content:
        `Tag n°**${tag.id}**, créé le ${(new Date(tag.created_at)).toLocaleDateString('fr-FR', {"dateStyle": "short"})}` +
        (tag.rating
          ? `, Note: **${tag.rating.toFixed(
              1
            )}**, ce qui correspond à une blague **${
              ludrole[tag.rating.toFixed()]
            }**.`
          : "") + `\n> ${tag.comment}`,
      allowed_mentions: [],
    });
    return;
  }
  if (tag.attachment) {
    message.channel.send({
      content: tag.comment
        ? `_Tag n°**${tag.id}**_, créé le ${(new Date(tag.created_at)).toLocaleDateString('fr-FR', {"dateStyle": "short"})}` +
          (tag.rating
            ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                tag.rating.toFixed()
              )}`
            : "") + `\n> ${tag.comment}`
        : `Tag n°**${tag.id}**` +
          (tag.rating
            ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                tag.rating.toFixed()
              )}`
            : ""),
      files: [tag.attachment],
      allowed_mentions: [],
    });
  } else {
    message.channel.send({
      content: tag.comment
        ? `> ${tag.comment}\n` +
          `Tag n°**${tag.id}**` +
          (tag.rating
            ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                tag.rating.toFixed()
              )}`
            : "")
        : `Tag n°**${tag.id}**` +
          (tag.rating
            ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                tag.rating.toFixed()
              )}`
            : ""),
      allowed_mentions: [],
    });
  }
};
