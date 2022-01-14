module.exports = async (message, supabase) => {
  const id = message.content.slice(2).split(" ")[0];
    const res = await supabase
      .from("archive")
      .select("id,comment,attachment")
      .eq("id", parseInt(id) || 0);
    if (res.data.length > 0) {
      const tag = res.data[0];
      message.channel.send({
        content: `> "${tag.comment}"\n` + `_Tag n°**${tag.id}**_`,
        files: [tag.attachment],
      });
    } else {
      message.reply(":x: Ce tag n'existe pas !");
    }
}