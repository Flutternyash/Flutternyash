// Фулл офформленный и рабочий (Но это не точно). Добавить сплитование и возможноть юзать 2+ словные команды.

module.exports = {
  name: "f",
  aliases: ["honour", "честь", "ф", "рщтщгк"/*honour*/, "зкуыы"/*press*/, "xtcnm"/*Честь*/],
  memberName: "F | Честь",
  description: "Отдать честь.",

  execute(message) {
    message.channel.startTyping();
    setTimeout(() => {
    message.channel.send("", {
      files: [
        "./.content/img/f.png"
      ]
    });
      message.channel.stopTyping();
    }, 300);
  }
};