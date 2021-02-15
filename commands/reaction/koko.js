// Оформить не однословную команду.

module.exports = {
  name: "ko",
  aliases: ["co", "rj", "ко"],
  memberName: "Ко ко | Ko ko",
  description: "Поздоровайся Шишка!",

  execute(message) {
    message.channel.send("", {
      files: [
        "./.content/img/hihihi.png"
      ]
    });
  }};
