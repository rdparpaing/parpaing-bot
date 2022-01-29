const sendTag = require("../functions/sendTag")

module.exports = async (message, supabase) => {
  const groupName = message.content.slice(3);
  const res1 = await supabase
    .from("groups")
    .select("tags")
    .eq("name", groupName);
  if (res1.data.length > 0) {
    const res2 = await supabase
      .from("archive")
      .select("id, tag, comment, attachment, rating")
      .in("tag", res1.data[0].tags);
    if (res2.data && res2.data.length > 0) {
      const tag = res2.data[Math.floor(Math.random() * res2.data.length)];
      sendTag(message, tag)
    } else {
      message.react("❌");
    }
  } else {
    message.reply("❌");
  }
};
