module.exports = async (message, supabase) => {
  const id = parseInt(message.content.slice(3).split(' ')[0])
  const comment = message.content.slice(3).split(' ').slice(1).join(' ')

  if (isNaN(id) || !comment) {
    message.react("❌");
    return
  }

  const res = await supabase.from("archive")
    .update({comment: comment})
    .eq('id', id)
  
  if (res.status == 200) {
    message.react("✅");
  } else {
    message.react("❌");
  }
}