/** openweathermap.org
 *  URL: https://openweathermap.org/
 *  API: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}
 *  API: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
 *  KEY: 22b014486e70c11f07f2265afee7c1a9
 *  [lat=-12.05, lon=-77.05]
 */
/** climacell.co
 *  URL: https://developer.climacell.co/
 *  API: https://api.climacell.co/v3/locations?apikey=API_KEY
 *  KEY: xcsbwvoAAZoMLnLlmqpjgGBbQqIB7jCT
 */

/** accuweather.com - Forecast API
 *  URL: https://developer.accuweather.com/
 *  API: http://dataservice.accuweather.com/forecasts/v1/daily/1day/{locationKey}
 *  KEY: yD5kZRNijj1X8T1DGKjZKjfv8ggDqhpo
 *  Search text location: http://dataservice.accuweather.com/locations/v1/cities/search?apikey=yD5kZRNijj1X8T1DGKjZKjfv8ggDqhpo&q=Lima&language=es-ES
 * Forecast by city id: http://dataservice.accuweather.com/forecasts/v1/daily/1day/264120?apikey=yD5kZRNijj1X8T1DGKjZKjfv8ggDqhpo&language=es-ES&details=true&metric=true
 */

 //para openweathermap
//{url: url, json: true}

/*
request({url: openweathermap, json:true}, (error, response, body) => {
  console
  if (error) {
    console.log(error);
  } else if (response.body.cod) {
    console.log(response.body.message);
  } else {
    console.log(body.current.weather[0].description);
  }
});
*/
/* for findinf weather precipitation probability
 fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey})
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const { pressure, temp, humidity } = data.main;
    const { speed, deg } = data.wind;
    const { description } = data.weather[0];
    const rain = data.rain['1h'];
    console.log(rain)
  });
  */
 //https://discourse.nodered.org/t/how-do-i-get-the-forecast-from-openweathermap/15028/6
 

const request = require('request');

//para Configurar opciones para climacell
/*
let climacelOptions = {
  method: 'GET',
  url: 'https://api.climacell.co/v3/weather/realtime',
  qs: {
    apikey: 'xcsbwvoAAZoMLnLlmqpjgGBbQqIB7jCT',
    lat: '-12.05',
    lon: '-77.05',
    unit_system: 'si',
    fields: ['precipitation', 'precipitation_type', 'temp', 'feels_like', 'dewpoint', 'wind_speed', 'wind_gust', 'baro_pressure', 'visibility', 'humidity', 'wind_direction', 'sunrise', 'sunset', 'cloud_cover', 'cloud_ceiling', 'cloud_base', 'surface_shortwave_radiation', 'moon_phase', 'weather_code']
  }
};
*/
/* todas las opciones posibles para climacell
precipitation, precipitation_type, temp, feels_like, dewpoint, wind_speed, wind_gust, baro_pressure, visibility, humidity, wind_direction, sunrise, sunset, cloud_cover, cloud_ceiling, cloud_base, surface_shortwave_radiation, moon_phase, weather_code
*/
/*
//El clima usando API CLIMACELL
const forecast = (latitude, longitude, callback) => {
  let climacellOptions = {
    method: 'GET',
    url: 'https://api.climacell.co/v3/weather/realtime',
    qs: {
      apikey: 'xcsbwvoAAZoMLnLlmqpjgGBbQqIB7jCT',
      lat: latitude,
      lon: longitude,
      unit_system: 'si',
      fields: ['precipitation', 'precipitation_type', 'temp', 'feels_like', 'dewpoint', 'wind_speed', 'wind_gust', 'baro_pressure', 'visibility', 'humidity', 'wind_direction', 'sunrise', 'sunset', 'cloud_cover', 'cloud_ceiling', 'cloud_base', 'surface_shortwave_radiation', 'moon_phase', 'weather_code']
    }
  };

  let weatherCodes = {
    rain_heavy: 'Substantial rain',
    rain: 'Rain',
    rain_light: 'Light rain',
    freezing_rain_heavy: 'Substantial freezing rain',
    freezing_rain: 'Freezing rain',
    freezing_rain_light: 'Light freezing rain',
    freezing_drizzle: 'Light freezing rain falling in fine pieces',
    drizzle: 'Light rain falling in very fine drops',
    ice_pellets_heavy: 'Substantial ice pellets',
    ice_pellets: 'Ice pellets',
    ice_pellets_light: 'Light ice pellets',
    snow_heavy: 'Substantial snow',
    snow: 'Snow',
    snow_light: 'Light snow',
    flurries: 'Flurries',
    tstorm: 'Thunderstorm conditions',
    fog_light: 'Light fog',
    fog: 'Fog',
    cloudy: 'Cloudy',
    mostly_cloudy: 'Mostly cloudy',
    partly_cloudy: 'Partly cloudy',
    mostly_clear: 'Mostly clear',
    clear: 'Clear, sunny',
  };

  request(climacellOptions, (error, response, body) => {
    //if(error) throw new Error(error);
    
    if(error) {
      callback(`${error}`);
    } else if (response.statusCode != 200) {
      body = JSON.parse(body);
      callback(`${body.errorCode}: ${body.message}`);
    } else {
      body = JSON.parse(body);
      callback(undefined, `${weatherCodes[body.weather_code.value]}, It is currently ${body.temp.value} C, ${body.precipitation.value} % chance of rain`);
    }
  });
};
*/

//El clima usando API OPENWEATHERMAP
const forecast = (latitude, longitude, callback) => {
  const openweathermap= `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=22b014486e70c11f07f2265afee7c1a9`;

  request({url: openweathermap, json:true}, (error, response, body) => {
    if (error) callback(`${error}`);
    else if (response.body.cod){
      callback(`Error: ${response.body.cod}, message: ${response.body.message}`);
    } else {
      let weatherResumn = {
        temp: body.current.temp,
        des: body.current.weather[0].description,
        humidity: body.current.humidity,
        wind_speed: body.current.wind_speed
      }
      callback(undefined, `Temp: ${body.current.temp} C\nweather: ${body.current.weather[0].description}\nHumidity: ${body.current.humidity} %\nWind Speed: ${body.current.wind_speed} Km/k`);
    }

  });
};

module.exports = forecast;

/** DOCUMENTATION */