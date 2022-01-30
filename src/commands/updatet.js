module.exports = async (message, supabase) => {
  const id = parseInt(message.content.slice(4).split(' ')[0])
  const tag = message.content.slice(4).split(' ')[1]

  if (isNaN(id) || !tag) {
    message.react("❌");
    return
  }

  const res = await supabase.from("archive")
    .update({tag})
    .eq('id', id)
  
  if (res.status == 200) {
    message.react("✅");
  } else {
    message.react("❌");
  }
}