// Фулл оформленная и готовая команда. Добавить условия старых сообщений.
module.exports = {
  name: "clear",
  aliases: ["удали", "почисти", "сдуфк"/*clear*/, "elfkb"/*удали*/, "gjxbcnb"/*почисти*/],
  memberName: "Clear | Удали",
  description: "Только скажи и я удалю все дерьмо в чате, черт возьми!",

  async execute(message, args) {
    let amount = args[0];
    await message.delete();
    const items = [
      "я удалил это дерьмо, не благодари!",
      "а можно меньше срать в чат, скатина?",
      "я так скоро уволюсь, фу, черт возьми, вы че ебланы?",
      "я жалею что моя машинная скорость на столько быстрая, что я успел прочесть все перед удалением.",
      "да да, только память я вашу не смогу почистить. Страдай, сука.",
      "если вдруг понадобится скриншот этого дерьма, оброщайся.",
    ];

    const item = items[Math.floor(Math.random()*items.length)];

    if (!amount) return message.reply("мне черт возьми догадыватся сколько тебе удалить надо блять?", {
      files: ["./.content/img/takStop.jpg"]
    });
    if (isNaN(amount) || amount < 0) return message.reply("ты долбоёб, чы да?");
    if (amount > 100) return message.reply("мне за это не платят, мудила.");
    if (amount == 1) return message.reply("сам удалиш, окда?");
    if (amount == 0) return message.channel.send("", {
      files: ["./.content/img/guu.png"]
    });
    amount = parseInt(amount);


    await message.channel.messages.fetch({
      limit: amount
    }).then(function (messages) {
      message.channel.bulkDelete(messages, true)
        .then(function (messages) {
          if (amount > messages.size) {
            message.channel.send("Удалил сколько смог. Из-за ограничений дискорда я не могу удалять сообщения старше 14 дней",)
              .then((msg) => msg.delete({timeout: 3000}));
          } else {
            message.channel.send(item)
              .then(msg => msg.delete({timeout: 3000}));
          }
        })

    })

  }
};

