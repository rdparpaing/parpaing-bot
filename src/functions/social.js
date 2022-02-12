module.exports = async (supabase, id, number) => {
  res = await supabase.from("srs").select("rating").eq("discord_id", id);
  if (res.data.length > 0) {
    res = await supabase
      .from("srs")
      .update({
        discord_id: id,
        rating: (parseInt(res.data[0].rating) + number).toString(),
      })
      .eq("discord_id", id);
    return 1;
  } else {
    res = await supabase
      .from("srs")
      .insert({ discord_id: id, rating: number.toString() });
    return 1;
  }
};
