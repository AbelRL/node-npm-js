/** Mapbox.com
 *  URL:
 *  API: https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token={API-KEY}
 *  KEY: pk.eyJ1IjoiYWJlbHJsIiwiYSI6ImNrYmJhbDZjeTAyazkydGp3NDhnb2cwb28ifQ.6nv9_5j7sF9Zn8hEAaYL3g
 */

//para mapbox
//const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWJlbHJsIiwiYSI6ImNrYmJhbDZjeTAyazkydGp3NDhnb2cwb28ifQ.6nv9_5j7sF9Zn8hEAaYL3g&limit=1';

const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJlbHJsIiwiYSI6ImNrYmJhbDZjeTAyazkydGp3NDhnb2cwb28ifQ.6nv9_5j7sF9Zn8hEAaYL3g&limit=1`;
  //body is an object froms response
  request({url, json:true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services.');
    } else if (body.features.length === 0) {
      callback('Unable to ofind location. Try another search');
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
 };

 module.exports = geocode;