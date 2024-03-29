module.exports = {
  name: "react",
  aliases: ["re"],
  memberName: "React",
  description: "132",

  execute(message) {
    message.react('👍').then(() => message.react('👎'));
    const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '👍') {
          message.reply('you reacted with a thumbs up.');
        } else {
          message.reply('you reacted with a thumbs down.');
        }
      })
      .catch(collected => {
        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
      });
  }
}

