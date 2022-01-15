module.exports = async (message, supabase) => {
  const id = message.content.slice(7);
  const res = await supabase
    .from("archive")
    .delete()
    .eq("id", parseInt(id) || 0);
  if (res.statusText != "OK") {
    message.channel.send(":x: Une erreur s'est produite.");
  } else {
    message.channel.send("✅ Ce tag a été supprimé !");
  }
};
