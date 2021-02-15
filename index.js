const {Client, Collection} = require("discord.js");
const {group} = require("./util/group");
const {readdirSync} = require("fs");
const config = require("./config.json");
const {ADMINISTRATOR} = require("./util/options.json")

const client = new Client({disableMentions: "everyone"});
client.db = require("./util/db");
client.commands = new Collection();
client.login(config.TOKEN).then();
client.queue = new Collection();

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

group.forEach(el => {
  const commandFiles = readdirSync(el)
    .filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`${el}/${file}`);
    client.commands.set(command.name, command);
    delete require.cache[require.resolve(`${el}/${file}`)];
  }
})

client.on("ready", () => {
  console.log(`
  ===============================================
  ${client.user.tag} приступил к работе, блэадь! =>
  => ID, для хуй знает чего: ${client.user.id}.
  ===============================================`);
  let i = 0;
  let timer = client.setInterval(function () {
    let gamePresence = ["фурри хентай...", "тебе в душу..."];
    let typePresence = ["LISTENING", "PLAYING", "WATCHING", "STREAMING",];
    let statusPresence = ["idle", "dnd", "online", "offline"];
    client.user.setPresence({
      activity: {name: gamePresence[i%gamePresence.length], type: "WATCHING"},
      status: "idle"
    }).then();
    i++;
  }, 50000)
  client.generateInvite(["ADMINISTRATOR"]).then((link) => {
    console.log(link);
  })
});

client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === "🔸╟uzwer");
  if (!channel) return;
  channel.send(`Хей-гей-ге-ей, ~~${member}~~ **мудила**, ты еще пожалеешь что припёрся в мой сарай!`);
})
client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.cache.find(channel => channel.name === "🔸╟uzwer");
  if (!channel) return;
  channel.send(`Что я говорил по поводу моего сарая, ~~${member}~~ сученыш?`); //Должно менятся с помошью сайта.
})

client.on("guildCreate", guild => { // Сделать ответ бота в общий чат канал.
  client.db.settings.insertRow.run(
    guild.id,
    guild.name
  );
  guild.systemChannel.send("О, дарова мудилы. А я на долго сюда? Просто у меня там молоко убегает...").then()

});

client.on("guildDelete", guild => {
  client.db.settings.deleteGuild.run(guild.id);
});

client.on("message", async (message) => {
  if (!message.guild) return;
  client.prefix = client.db.settings.selectPrefix.pluck().get(message.guild.id);
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send("https://cdn.discordapp.com/attachments/780105865616818219/794906910771511346/bezSloy.png").catch(console.error)
  }
})
