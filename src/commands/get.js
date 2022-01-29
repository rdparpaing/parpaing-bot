const { isNull } = require("underscore");

module.exports = async (message, supabase) => {
  const id = message.content.slice(2).split(" ")[0];
  if (isNaN(parseInt(id))) {
    res = await supabase
      .from("archive")
      .select("id,comment,attachment,rating")
      .eq("alias", id);
  } else {
    const res = await supabase
      .from("archive")
      .select("id,comment,attachment,rating")
      .eq("id", id);
  }
  if (isNull(res.data)) {
    message.react("❌");
    return;
  }
  if (res.data.length > 0) {
    const tag = res.data[0];
    if (tag.attachment) {
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
  } else {
    message.reply(":x: Ce post n'existe pas !");
  }
};
