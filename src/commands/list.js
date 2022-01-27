module.exports = async (message, supabase) => {
  const tag = message.content.slice(3).split(" ")[0];
  const res = await supabase.from("archive").select("id").eq("tag", tag);
  if (res.data.length > 1) {
    const list = res.data.map((i) => i.id);
    message.channel.send(
      `Le tag "**${tag}**" contient les ids **${list
        .slice(0, -1)
        .join("**, **")}** et **${list[list.length - 1]}**`
    );
  } else if (res.data.length == 1) {
    message.channel.send(
      `Le tag "**${tag}**" contient uniquement l'id **${res.data[0].id}**`
    );
  } else {
    message.reply(":x: Ce tag n'existe pas !")
  }
};
