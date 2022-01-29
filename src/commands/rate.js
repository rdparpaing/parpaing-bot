const { isNull } = require("underscore");

module.exports = async (message, supabase) => {
  const id = message.content.slice(3).split(" ")[0];
  const rating = parseInt(message.content.slice(3).split(" ")[1]);
  if (isNaN(rating)) {
    message.react("❌");
    return;
  }
  if (rating < 0 || rating > 5) {
    message.react("❌");
    return;
  }
  var post = (
    await supabase.from("archive").select("rating, whorated").eq("id", id)
  ).data;
  if (post.length == 0) {
    message.react("❌");
    return;
  } else post = post[0];
  if (post.whorated.indexOf(message.author.id) + 1) {
    message.react("❌");
    return;
  }
  post.whorated.push(message.author.id);
  if (isNull(post.rating)) {
    post.rating = rating;
  } else {
    post.rating =
      (post.rating * (post.whorated.length - 1) + rating) /
      post.whorated.length;
  }
  post = await supabase.from("archive").update(post).eq("id", id);
  if (post.status == 200) {
    message.react("✅");
  } else {
    message.react("❌");
  }
};
