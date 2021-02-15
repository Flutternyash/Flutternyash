
module.exports = { // Сделать что если он не в канале то отвечает что ты долбоеб.
  name: "leave",
  aliases: ["отвал", "выйди", "свободен", "дуфму", "отдыхай", "dsqlb", "cdj,jlty", "jndfk", "jnls[fq"],
  memberName: "Leave",
  description: "Попросить меня выйти с голосового канала.",
  async execute(message) {
    const channel = message.member.voice.channel
    if (!channel) message.reply("пхахаха, не не не, это так не работает." +
      "\nНе надо командовать мной когда ты сам хер знает где, паскуда.")

    if (channel) {
      await message.member.voice.channel.leave();
      message.channel.send("Да да. Пойду сотру себе память.")
    }
  }
};
