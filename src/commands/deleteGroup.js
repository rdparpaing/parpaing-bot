module.exports = async (message, supabase) => {
  const groupName = message.content.slice(8);
  const res = await supabase.from("groups").delete().eq("name", groupName);
  if (res.statusText != "OK") {
    message.channel.send(":x: Une erreur s'est produite.");
  } else {
    message.channel.send("✅ Ce groupe a été supprimé !");
  }
};
