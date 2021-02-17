const {MessageEmbed} = require('discord.js');
const wiki = require('wikipedia-tldr');

module.exports = {
  name: "wiki",
  aliases: ["вики", "расскажи", "просвети", "что такое"],
  memberName: "Wiki | Вики",
  description: "Забыл что такое вагина? Я могу напомнить использовав Википедию.",



  async execute(message, args) {
    let img = null;
    const search = args.join(" ").replace(/[^0-9A-Za-zА-Яа-яЁё\s+]/g, "");
    console.log(search);
    if (!search) {
      return message.reply("хорошо, а теперь давай еще раз.\n Но только в этот раз введи что ищешь, даунила.");
    }
    await wiki(search, 'ru').then(result => {
      img =  result.thumbnail.source;
    }).catch(err => {
      img = '';
    });


    wiki(search, 'ru').then(result => {
      if (!img) {
        img = "https://cdn.discordapp.com/attachments/740430038041886750/810856332898992148/Wikipedia.png";
      }
      let wikiEmbed = new MessageEmbed()
        .setTitle(result.title)
        .setURL(`https://ru.wikipedia.org/wiki/${result.title}`.replace(" ", "_"))
        .setDescription(result.extract)
        .setThumbnail(img)
        .setColor("#ffa4c0")

      message.channel.send(wikiEmbed);

    }).catch(err => {
      message.reply("все хуйня, давай по новой.");
    })
  }
}
