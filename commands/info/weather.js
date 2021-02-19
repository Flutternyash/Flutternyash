const {MessageEmbed} = require('discord.js');
const weather = require('openweather-apis');
const config = require('../../config.json');

module.exports = {
  name: "weather",
  aliases: [],
  memberName: "weather",
  description: "показать погоду",

  async execute(message, args) {
    let description = [
      "переменная облачность",
      "небольшая облачность",
      "ясно",
      "снег",
      "облачно с прояснениями",
      "пасмурно",
      "ясно",
      "небольшой дождь",
      "дождь",
      "небольшой снег",
      "туман"
    ];
    const search = args.join(" ");

    function getDescriptionId(id) {
      if (id === 200 || id === 201 || id === 202 || id === 230 || id === 231 || id === 232) {
        return "<:rain_and_thunderstorm:811385030559399966>"
      }
      if (id === 210 || id === 211 || id === 212 || id === 221) {
        return "<:thunderstorm:811389735242301440>"
      }
      if (id === 300 || id === 301 || id === 302 || id === 310 || id === 311 || id === 312 || id === 321 || id === 511) {
        return "<:rain:811384292558897172>"
      }
      if (id === 313 || id === 314 || id === 520 || id === 521 || id === 522 || id === 531 ) {
        return "<:showers:811389076909457439>"
      }
      if (id === 500 || id === 501 || id === 502 || id === 503 || id === 504) {
        return "<:rain_and_sun:811390264098291732>"
      }
      if (id === 600 || id === 601 || id === 602 || id === 620 || id === 621 || id === 622) {
        return "<:snow:811388364061409300>"
      }
      if (id === 601 || id === 611 || id === 612 || id === 613 || id === 615 || id === 616) {
        return "<:rain_and_snow:811387769154043925>"
      }
      if (id === 701 || id === 711 || id === 721 || id === 731 || id === 741 || id === 751 || id === 761 || id === 762) {
        return "<:fogs:811388841159688222>"
      }
      if (id === 771) {
        return "<:wind:811393805999013898>"
      }
      if (id === 781) {
        return "<:tornado:811395256134139904>"
      }
      if (id === 800) {
        return "<:the_sun:811390880233291776>"
      }
      if (id === 801 || id === 802) {
        return "<:at_times_it_is_clear:811391661673545799>"
      }
      if (id === 803 || id === 804) {
        return "<:broken_clouds:811393440251641907>"
      }
    }

    function getLine(deg) {
      if (deg >= 0 && deg <= 30 || deg >= 330 && deg <= 360) return "<:U_S:811402645445017645>";
      if (deg > 30 && deg < 60) return "<:UZ_SW:812317903151955988>";
      if (deg >= 60 && deg <= 120) return "<:Z_W:811402645092302899>";
      if (deg > 120 && deg < 150) return "<:CZ_NW:812317903109619762>";
      if (deg >= 150 && deg <= 210) return "<:C_N:811402645171339305>";
      if (deg > 210 && deg < 240) return "<:CB_NE:812316865799127041>";
      if (deg >= 240 && deg <= 300) return "<:B_E:811402644844576790>";
      if (deg > 300 && deg < 330) return "<:UB_SE:812317903038447656>";
    }

    weather.setLang('ru');
    weather.setCity(search);
    weather.setUnits('metric');
    weather.setAPPID(config.WEATHER_API_KEY);
    //соотнести величину deg api openweather с смайликами направления ветра
    //соотнести смайлики с погодными условиями
    //разбить сутки на временные рамки

    let varriant = '';
    weather.getWeatherForecast((err, obj) => {
      const res = obj.list[0];
      message.channel.send(`${getLine(parseInt(res.wind.deg))}${res.wind.speed}m/s - ${getDescriptionId(parseInt(res.weather[0].id))}${res.weather[0].description}`);
    });
  }
};
