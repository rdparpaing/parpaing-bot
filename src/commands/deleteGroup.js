module.exports = async (message, supabase) => {
  const groupName = message.content.slice(3);
  const res = await supabase.from("groups").delete().eq("name", groupName);
  if (res.statusText != "OK") {
    message.react("❌");
  } else {
    message.react("✅");
  }
};
