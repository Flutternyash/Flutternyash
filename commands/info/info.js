const {MessageEmbed} = require("discord.js"); // Дописать и оформить.

module.exports = {
  name: "info",
  aliases: ["i", "инфо", "info", "расскажи", "штащ", "byaj", "hfccrf;b"],
  memberName: "Info",
  description: "Узнай меня поближе.",

  parseTime: (milliseconds) => {
    let hours = milliseconds / (1000*60*60);
    let absoluteHours = Math.floor(hours);
    let h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);
    let m = absoluteMinutes > 9 ? absoluteMinutes : "0" +  absoluteMinutes;

    let seconds = (minutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(seconds);
    let s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

    return `${h}:${m}:${s}`;
  },

  execute(message) {
    let exampleEmbed = new MessageEmbed()
      .setColor("#f1ee41")
      .setTitle("Я вижу ты хочешь фулл-инфу? Окей амиго, смотри...")
      .setURL("")
      .setAuthor("Fucking Cat! Собственной персоной, черт побери!",
        "",
        "https://discord.gg/hR7GBBr")
      .setDescription("")
      //.setThumbnail('https://cdn.discordapp.com/attachments/779330454506963034/782255493519114250/Bong3333oKolo.gif')
      //.setThumbnail('https://cdn.discordapp.com/attachments/779330454506963034/782242332417851402/33333333333333333_1.png')
      .setThumbnail("https://cdn.discordapp.com/attachments/779330454506963034/782414891453644840/XOsX.gif")
      .addFields([
        {
          name: "Общее количество моих юзверей:",
          value: "Uiri",
          inline: true
        },
        {
          name: "Это мой сайт, черт возьми:",
          value: "test.bot:",
          inline: true
        },
        {
          name: "При желании можешь меня пригласить, правда я не советую:",
          value: "test.bot.invite",
          inline: true
        },
        {
          name: "Ну а эти ~~утырки~~ ребята меня создали, чуть что пиши им:",
          value: ":female_sign:Flutt#9235 \n :male_sign:Артси#7095",
          inline: false
        }
      ])
      .setImage("")
      .setFooter(` Release: 31.12.2020 | Version: 1.0.0 | UpTime: ${this.parseTime(message.client.uptime)}`)


    message.channel.send(exampleEmbed);
    // message.channel.send('https://cdn.discordapp.com/attachments/770432343169040394/781618877113171978/BongoLow.gif')
  }
}
