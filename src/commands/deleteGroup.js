module.exports = async (message, supabase) => {
  const groupName = message.content.slice(3);
  const res = await supabase.from("groups").delete().eq("name", groupName);
  if (res.statusText != "OK") {
    message.channel.send(":x: Une erreur est survenue.");
  } else {
    message.react("✅");
  }
};
