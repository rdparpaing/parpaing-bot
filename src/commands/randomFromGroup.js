module.exports = async (message, supabase) => {
  const groupName = message.content.slice(3);
  const res1 = await supabase
    .from("groups")
    .select("tags")
    .eq("name", groupName);
  if (res1.data.length > 0) {
    const res2 = await supabase
      .from("archive")
      .select("id, tag, comment, attachment, rating")
      .in("tag", res1.data[0].tags);
    if (res2.data && res2.data.length > 0) {
      const tag = res2.data[Math.floor(Math.random() * res2.data.length)];
      if (tag.attachment) {
        message.channel.send({
          content: tag.comment
            ? `> ${tag.comment}\n` + `_Tag n°**${tag.id}**_ *${tag.tag}*` + (tag.rating
              ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                  tag.rating.toFixed()
                )}`
              : "")
            : `Tag n°**${tag.id}** *${tag.tag}*` + (tag.rating
              ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                  tag.rating.toFixed()
                )}`
              : ""),
          files: [tag.attachment],
        });
      } else {
        message.channel.send(
          tag.comment
            ? `> ${tag.comment}\n` + `Tag n°**${tag.id}** *${tag.tag}*` + (tag.rating
              ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                  tag.rating.toFixed()
                )}`
              : "")
            : `Tag n°**${tag.id}** *${tag.tag}*` + (tag.rating
              ? `, Note: **${tag.rating.toFixed(1)}** ${":star:".repeat(
                  tag.rating.toFixed()
                )}`
              : "")
        );
      }
    } else {
      message.reply(":x: Ce tag n'existe pas !");
    }
  } else {
    message.reply(":x: Ce groupe n'existe pas !");
  }
};
