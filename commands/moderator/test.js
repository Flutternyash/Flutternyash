// Фулл оформленная, рабочая команда, но, может еще чет ебануть в голову.

module.exports = {
  name: "test",
  aliases: ["работай", "тест", "еуые"/*test*/, "hf,jnfq"/*работай*/, "ntcn"/*тест*/],
  memberName: "Test | Тест",
  description: "Проверить мою работоспособность и отклик. Да, сделай это.",

  execute(message) {
    const randomWords = [
      "нахуй пошел. Окда?",
      "отвал, цапля тупорылая.",
      "хей-гей-ге-ей мудила, да, черт возьми, я работаю!",
      "ты кажется кое-что забыл... \n Убрать за собой дерьмо. Такой взрослый, а обосрался.",
      "если моей работой заключается унижения и оскорбления, то да, черт возьми, это лучшая работа в мире!"
    ];

    const randomIndex = Math.floor(Math.random() * randomWords.length);
    const word = randomWords[randomIndex];
    message.send(word)

    const randomImg = Math.floor(Math.random() * 4) + 1;
    if (randomImg === 1) {
      message.channel.send("https://tenor.com/Lywi.gif")
    } else if (randomImg === 3) {
      message.channel.send("https://tenor.com/view/umm-confused-blinking-okay-white-guy-blinking-gif-7513882")
    }
  }
};
