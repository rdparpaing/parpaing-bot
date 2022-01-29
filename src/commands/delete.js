module.exports = async (message, supabase) => {
  const id = message.content.slice(2);
  const res = await supabase
    .from("archive")
    .delete()
    .eq("id", parseInt(id) || 0);
  if (res.statusText != "OK") {
    message.react("❌");
  } else {
    message.react("✅");
  }
};
