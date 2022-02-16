module.exports = (message) => {
  const argv = message.content.split(" ").slice(1);
  if (argv.length == 0) {
    return message.author.id;
  } else {
    if (message.mentions.users.first()) {
      return message.mentions.users.first().id;
    } else if (/\d{17,19}/.test(argv[0])) {
      return argv[0];
    }
  }
};
