const {MessageEmbed} = require('discord.js');
const wiki = require('wikipedia-tldr');

module.exports = {
  name: "wiki",
  aliases: [],
  memberName: "wiki",
  description: "wiki info",

  async execute(message, args) {
    let img = null;
    const search = args.join(" ");
    if (!search) {
      return message.reply("input object to search");
    }

    await wiki(search, 'ru').then(result => {
      img =  result.thumbnail.source;
    }).catch(err => {
      img = '';
    });


    wiki(search, 'ru').then(result => {
      if (!img) {
        img = "https://cdn.discordapp.com/attachments/779330454506963034/782414891453644840/XOsX.gif";
      }
      let wikiEmbed = new MessageEmbed()
        //.setAuthor(`${client.user.username}`, `${client.user.avatar}`)
        .setTitle(result.title)
        .setDescription(result.extract)
        // .addField(`${result.title}`, `\n${result.extract}`, false)
        .setThumbnail(img)
        .setColor("#ff8325")
        .setFooter("");

      message.channel.send(wikiEmbed);

    }).catch(err => {
      message.reply("No source");
    })
  }
};
