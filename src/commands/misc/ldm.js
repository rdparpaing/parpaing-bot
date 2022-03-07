const { ludrole } = require("../../constants.json");
const social = require("../../functions/social");

module.exports = async (message, supabase) => {
  var joke = message.content.split(" ").slice(1).join(" ");
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
      try {
        let voters = [];
        let sum = 0;
        collected = Array.from(collected.values());
        for (i in collected) {
          try {
            if (
              message.mentions.users.last() &&
              collected[i].author.id == message.mentions.users.last().id
            ) {
              collected[i].react("❌");
              continue;
            }
            if (voters.indexOf(collected[i].author.id) + 1) {
              collected[i].react("❌");
              continue;
            }
          } catch {
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
          const mention = joke.split(" ")[joke.split(" ").length - 1];
          if (/<@!?(\d{17,19})>/g.test(mention)) {
            if (sum / voters.length >= 10) {
              console.log(1);
              social(supabase, message.mentions.users.last().id, 10);
            } else if (sum / voters.length >= 5) {
              social(supabase, message.mentions.users.last().id, 5);
            } else if (sum / voters.length <= 3) {
              social(supabase, message.mentions.users.last().id, -10);
            }
            joke = joke.split(" ").slice(0, -1).join(" ");
          }
          if (joke.replace(/\s/g, "") != "") {
            message.react("✅");
          } else {
            message.react("🟡");
          }
        } else {
          message.react("❌");
        }
      } catch {
        console.log("error with g!ldm")
      }
    });
};
