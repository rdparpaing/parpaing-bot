module.exports = async (message, supabase) => {
  const groupName = message.content.slice(2).split(" ")[0];
  const groupTags = message.content
    .replace(/[\s\n]+/gi, " ")
    .split(" ")
    .slice(1);

  if (groupName && groupTags.length > 0) {
    const res = await supabase.from("groups").upsert(
      {
        name: groupName,
        tags: groupTags,
      },
      {
        onConflict: "name",
      }
    );
    if (res.statusText == "Created") {
      message.channel.send("✅ Votre groupe a été créé");
    } else {
      message.channel.send(":x: Une erreur est survenue.");
    }
  } else {
    message.reply(":x: Le groupe doit contenir au moins un nom et un tag !");
  }
};