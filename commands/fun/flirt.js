// Добавить условие о упоминании и ответ с упоминанием нужного для пользователя тела.

module.exports = {
  name: "flirt",
  aliases: ["флирт", "подкати", "адшке"/*flirt*/, "akbhn"/*флирт*/, "gjlrfnb"/*подкати*/],
  memberName: "Flirt | Флирт",
  description: "Подкатить к ублюдку.",

  execute(message) {
    const randomFlirt = [
      "123",
      "321",
      "231",
      "312",
      "221"
    ];

    message.delete().catch();
    const randomIndex = Math.floor(Math.random() * randomFlirt.length);
    const word = randomFlirt[randomIndex];// +ник который упоменул автор.
    message.channel.send(word);
  }
}