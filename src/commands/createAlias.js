module.exports = async (message, supabase) => {
  const argv = message.content.split(" ").slice(1);
  const id = parseInt(argv[0]);

  if (isNaN(id) || !argv[1]) {
    message.react("❌");
    return;
  }

  const res = await supabase
    .from("archive")
    .update({ alias: argv[1] })
    .eq("id", id);
  if (res.status != 200) {
    message.react("❌");
  } else {
    message.react("✅");
  }
};
