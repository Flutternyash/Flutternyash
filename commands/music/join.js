
module.exports = {
  name: "join",
  aliases: ["зайди", "заскочи"],
  memberName: "Join | Зайди",
  description: "Попросить меня зайти к тебе в голосовой канал, надеюсь ты руки помыл.",

  async execute(message) {
    const channel = message.member.voice.channel

    if (!channel && message.guild.me.voice.channel) {
      message.reply("ох, нет нет нет. Это ты зайди, сученыш.");
      return;
    }

    if (!channel) {
      message.reply("а может, ты, черт возьми... Зайдешь в гребаный войс, м?");
      return;
    }

    if (channel && !message.guild.me.voice.channel) {
      await channel.join();
      message.channel.send("Чё надо? \n Давай ток быстрее, у меня там хентай на паузе блеать.");
    } else if (channel === message.guild.me.voice.channel) {
      message.reply("выписываю и отправляю направление к твоему окулисту. \n Надеюсь, там понимают бинарный код.");
    } else {
      message.reply("сыш, тварь, если ты не видишь, то спешу тебе сообшить, что я СУКА ЗАНЯТ!");
    }
  }
};
