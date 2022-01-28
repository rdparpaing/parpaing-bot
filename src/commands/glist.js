var _ = require("underscore");

module.exports = async (message, supabase) => {
  const argv = message.content.split(" ").slice(1);
  if (argv.length > 0) {
    const groupName = argv[0];
    const res1 = await supabase
      .from("groups")
      .select("tags")
      .eq("name", groupName);
    if (res1.data.length > 0) {
      const res2 = await supabase
        .from("archive")
        .select("id, tag, comment, attachment")
        .in("tag", res1.data[0].tags);
      if (res2.data.length > 0) {
        let tagcount = {};
        for (let i in res2.data) {
          tagcount[res2.data[i].tag] = (tagcount[res2.data[i].tag] || 0) + 1;
        }
        str = "Les tags du groupe *" + groupName + "* sont: ";
        for (i in res1.data[0].tags) {
          str += `**${res1.data[0].tags[i]}** (${
            tagcount[res1.data[0].tags[i]] || 0
          })`;
          str += ", ";
        }
        message.channel.send(str);
      } else {
        message.reply(":x: Il n'y a pas d'éléments à afficher !");
      }
    } else {
      message.reply(":x: Ce groupe n'existe pas !");
    }
  } else {
    const res1 = await supabase.from("groups").select("name,tags");
    const res2 = await supabase.from("archive").select("tag");
    let tagslist = _.uniq(res2.data.map((i) => i.tag));
    groupedtagslist = _.union(...res1.data.map((i) => i.tags));
    let groups = res1.data.map((i) => i.name);
    let ungrouped = _.difference(tagslist, groupedtagslist);
    str = "Les groupes de tags sont: ";
    for (i in groups) {
      str += `**${groups[i]}** (${res1.data[i].tags.length}), `;
    }
    str += `*Sans groupe (${ungrouped.length})*`;
    message.channel.send(str);
  }
};
