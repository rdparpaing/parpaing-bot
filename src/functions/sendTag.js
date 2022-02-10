const { ludrole } = require("../constants.json");

module.exports = async (message, tag) => {
  if (tag.tag == "ldm") {
    message.channel.send(
      `> ${tag.comment}\n` +
        `Tag n°**${tag.id}**` +
        (tag.rating
          ? `, Note: **${tag.rating.toFixed(
              1
            )}**, ce qui correspond à une blague **${
              ludrole[tag.rating.toFixed()]
            }**.`
          : "")
    );
    return;
  }
  if (tag.attachment) {
    message.channel.send({
      content: tag.comment
        ? `> ${tag.comment}\n` +
          `_Tag n°**${tag.id}**_` +
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
      files: [tag.attachment],
    });
  } else {
    message.channel.send(
      tag.comment
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
              : "")
    );
  }
};
