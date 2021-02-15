const {MessageEmbed} = require('discord.js');
const weather = require('openweather-apis');
const config = require('../../config.json');

module.exports = {
  name: "weather",
  aliases: [],
  memberName: "weather",
  description: "показать погоду",

  async execute(message, args) {
    const search = args.join(" ");
    weather.setLang('ru');
    weather.setCity(search);
    weather.setUnits('metric');
    weather.setAPPID(config.WEATHER_API_KEY);

    weather.getSmartJSON(function(err, temp){
      console.log(temp)
    });
  }
};
