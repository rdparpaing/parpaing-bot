const { isNull } = require("underscore");
const sendTag = require("../functions/sendTag")

module.exports = async (message, supabase) => {
  const id = message.content.slice(2).split(" ")[0];
  if (isNaN(parseInt(id))) {
    res = await supabase
      .from("archive")
      .select("id,comment,attachment,rating")
      .eq("alias", id);
  } else {
    res = await supabase
      .from("archive")
      .select("id,comment,attachment,rating")
      .eq("id", id);
  }
  if (!res) return
  if (isNull(res.data)) {
    message.react("❌");
    return;
  }
  if (res.data.length > 0) {
    const tag = res.data[0];
    sendTag(message, tag)
  } else {
    message.react("❌");
  }
};
