const { supabase } = require("../main");

module.exports = async (id) => {
  var res = await supabase
    .from("srs")
    .select("messages_count,lastmsg_ts,rating")
    .eq("discord_id", id);
  if (res.data.length > 0) {
    let currentUser = res.data[0];
    if (Date.parse(res.data[0].lastmsg_ts) + 60000 > Date.now()) return;
    if (res.data[0].messages_count + 1 == 50) {
      res = await supabase
        .from("srs")
        .update({
          lastmsg_ts: new Date().toISOString(),
          messages_count: 0,
          rating: (parseInt(res.data[0].rating) + 1).toString(),
        })
        .eq("discord_id", id);
      return 1;
    } else {
      res = await supabase
        .from("srs")
        .update({
          lastmsg_ts: new Date().toISOString(),
          messages_count: res.data[0].messages_count + 1,
        })
        .eq("discord_id", id);
      return 1;
    }
  } else {
    res = await supabase
      .from("srs")
      .insert({
        discord_id: id,
        rating: "0",
        lastmsg_ts: new Date().toISOString(),
        messages_count: 1,
      });
    return 1;
  }
};
