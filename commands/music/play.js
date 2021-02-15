const fs = require('fs');
const {Util, MessageEmbed} = require('discord.js');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

module.exports = {
  name: "play",
  aliases: ["вруби", "включи", "dhe,b", "drk.xb", "здфн"],
  memberName: "Play",
  description: "Можешь попросить меня стримнуть свою дермомузыку, тебе и твоим друзьям.",
  execute: async function (message, args) {
    const serverQueue = message.client.queue.get(message.guild.id)
    const channel = message.member.voice.channel
    if (!channel) message.reply("ты предлагаешь зайти к тебе домой и спеть? Зайди в чертов войс, тупица!");

    const search = args.join(" ");
    if (!search) {
      await channel.join();
      message.reply("а врубить что блэадь? Лошадь ты тупая, все хуйня, давай сначала.");
      return;
    }
    const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
    let song = null;
    let songInfo = null;

    if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
      try {
        songInfo = await ytdl.getInfo(url);
        if (!songInfo) {
          return message.reply("лол, ну такой хуйни на YouTube еще не залили.");
        }
        song = {
          id: songInfo.videoDetails.videoId,
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url,
          img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
          duration: songInfo.videoDetails.lengthSeconds,
          ago: songInfo.videoDetails.published,
          views: String(songInfo.videoDetails.viewCount).padStart(10, ' '),
          req: message.author
        };
      } catch (error) {
        console.log(error);
        return message.reply(error.message).catch(console.error);
      }
    } else {
      try {
        await yts.search(search)
          .then(result => {
            if (result.videos.length === 0) message.reply("лол, ну такой хуйни на YouTube еще не залили.");
            songInfo = result.videos[0];
            song = {
              id: songInfo.videoId,
              title: Util.escapeMarkdown(songInfo.title),
              views: String(songInfo.views).padStart(10, ' '),
              url: songInfo.url,
              ago: songInfo.ago,
              duration: songInfo.duration.toString(),
              img: songInfo.image,
              req: message.author
            };
          }).catch(error => {
            console.log(error);
          })
      } catch (error) {
        console.error(error);
      }
    }
    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
        .setColor("RANDOM")
        .addField("В список добавлен:", song.title, songInfo.url,)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 50,
      playing: true,
      loop: false
    };

    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
      if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
      };
      let online = afk[message.guild.id]
      if (!song) {
        if (!online.afk) {
          message.client.queue.delete(message.guild.id);
        }
        return message.client.queue.delete(message.guild.id);
      }
      let stream;
      if (song.url.includes("youtube.com")) {
        stream = await ytdl(song.url);
        stream.on('error', err => {
          if (queue) {
            queue.songs.shift();
            play(queue.songs[0]);
          }

          message.reply(`An unexpected error has occurred.\nPossible type \`${err}\``)
        });
      }
      queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

      const dispatcher = queue.connection
        .play(ytdl(song.url, {quality: 'highestaudio', highWaterMark: 1 << 25, type: "opus"}))
        .on("finish", () => {
          const shiffed = queue.songs.shift();
          if (queue.loop === true) {
            queue.songs.push(shiffed);
          }
          play(queue.songs[0])
        })

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
        .setAuthor("Подрубаю трек.", "")
        .setThumbnail(song.img)
        .setColor(message.member.displayHexColor) // Сделать что бы цвет зависил от цвета роли.
        .addField("Название:", song.title, true)
        .addField("Продолжительность:", song.duration, true)
        .addField("Запросил:", song.req.tag, true)
        .setFooter(`Общее:${song.views}| ${song.ago}`)
      queue.textChannel.send(thing);
    }

    try {
      queueConstruct.connection = await channel.join();
      await play(queueConstruct.songs[0]);

    } catch (error) {
      console.error(`Я не смог подрубится к войс каналу: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return message.reply(`Я не смог подрубится к войс каналу: ${error}`);
    }


  }
};
