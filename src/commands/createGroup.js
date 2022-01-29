module.exports = async (message, supabase) => {
  const groupName = message.content.slice(3).split(" ")[0];
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
      message.react("✅");
    } else {
      message.react("❌");
    }
  } else {
    message.react("❌");
  }
};
