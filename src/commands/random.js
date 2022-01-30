const sendTag = require("../functions/sendTag");

module.exports = async (message, supabase) => {
  const _tag = message.content.slice(2).split(" ")[0];
  if (_tag == "*") {
    const res = await supabase.from("archive").select("id");
    if (res.data.length > 0) {
      const id = res.data[Math.floor(Math.random() * res.data.length)];
      const res2 = await supabase
        .from("archive")
        .select("id,comment,attachment")
        .eq("id", id);
      if (res2.data.length > 0) {
      } else {
        message.reply("x: Une erreur est survenue.");
      }
    } else {
      message.reply("x: Une erreur est survenue.");
    }
  }
  const res = await supabase
    .from("archive")
    .select("id,comment,attachment,rating")
    .eq("tag", _tag);
  if (res.data.length > 0) {
    const tag = res.data[Math.floor(Math.random() * res.data.length)];
    sendTag(message, tag);
  } else {
    message.reply(":x: Ce tag n'existe pas !");
  }
};
