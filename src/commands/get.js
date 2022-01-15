module.exports = async (message, supabase) => {
  const id = message.content.slice(3).split(" ")[0];
  const res = await supabase
    .from("archive")
    .select("id,comment,attachment")
    .eq("id", parseInt(id) || 0);
  if (res.data.length > 0) {
    const tag = res.data[0];
    if (tag.attachment) {
      message.channel.send({
        content: tag.comment
          ? `> ${tag.comment}\n` + `Tag n°**${tag.id}**`
          : `Tag n°**${tag.id}**`,
        files: [tag.attachment],
      });
    } else {
      message.channel.send(
        tag.comment
          ? `> ${tag.comment}\n` + `Tag n°**${tag.id}**`
          : `Tag n°**${tag.id}**`
      );
    }
  } else {
    message.reply(":x: Ce post n'existe pas !");
  }
};
