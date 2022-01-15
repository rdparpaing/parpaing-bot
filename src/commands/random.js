module.exports = async (message, supabase) => {
  const _tag = message.content.slice(1).split(" ")[0];
    const res = await supabase
      .from("archive")
      .select("id,comment,attachment")
      .eq("tag", _tag);
    if (res.data.length > 0) {
      const tag = res.data[Math.floor(Math.random() * res.data.length)];
      if (tag.attachment) {
        message.channel.send({
          content: tag.comment ? `> ${tag.comment}\n` + `_Tag n°**${tag.id}**_` : `Tag n°**${tag.id}**`,
          files: [tag.attachment],
        });
      } else {
        message.channel.send(tag.comment ? `> ${tag.comment}\n` + `Tag n°**${tag.id}**` : `Tag n°**${tag.id}**`);
      }
    } else {
      message.reply(":x: Ce tag n'existe pas !");
    }
  }