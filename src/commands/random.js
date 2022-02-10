const sendTag = require("../functions/sendTag");

module.exports = async (message, supabase) => {
  const _tag = message.content.slice(2).split(" ")[0];
  if (_tag == "*") {
    const res = await supabase.from("archive").select("id,comment,attachment");
    if (res.data.length > 0) {
      const tag = res.data[Math.floor(Math.random() * res.data.length)];
      sendTag(message, tag);
    } else {
      message.react("❌");
    }
    return;
  }
  const res = await supabase
    .from("archive")
    .select("id,comment,attachment,rating,tag")
    .eq("tag", _tag);
  if (res.data.length > 0) {
    const tag = res.data[Math.floor(Math.random() * res.data.length)];
    sendTag(message, tag);
  } else {
    message.react("❌");
  }
};
