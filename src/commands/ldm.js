const { ludrole } = require("../data/constants.json");

module.exports = async (message, supabase) => {
  const joke = message.content.split(" ").slice(1).join(" ")
  let m = await message.channel.send(
    "**Veuillez noter le niveau de drole de cet évènement** (nombre entier entre 0 et 12)"
  );
  m.channel
    .awaitMessages({
      filter: (m) =>
        !isNaN(parseInt(m)) && parseInt(m) >= 0 && parseInt(m) <= 12,
      time: 30000,
      errors: ["time"],
    })
    .catch(async (collected) => {
      let voters = [];
      let sum = 0;
      collected = Array.from(collected.values());
      for (i in collected) {
        if (voters.indexOf(collected[i].author.id) + 1) {
          collected[i].react("❌");
          continue;
        }
        collected[i].react("✅");
        voters.push(collected[i].author.id);
        sum += parseInt(collected[i].content);
      }
      if (voters.length > 0) {
        m.channel.send(
          `Le niveau de drole de cette blague est estimé à **${
            sum / voters.length
          }**, ` +
            `ce qui correspond à une blague **${
              ludrole[Math.floor(sum / voters.length)]
            }**.`
        );
        if (joke.replace(/\s/g, "") != "") {
          const res = await supabase.from("archive")
            .insert({comment: joke, tag: "ldm", rating: (sum / voters.length).toFixed(1)})
          message.react("✅")
        } else {
          message.react("🟡")
        }
      }
    });
};
