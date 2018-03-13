// Promises information about the client's location
// Requires: jQuery
function getLocationInformation(apiKey, callback) {
    // Get the client's IP address
    $.getJSON('//api.ipify.org?format=jsonp&callback=?', data => {
        // Get the client's IP based location data
        $.getJSON('//geoip.nekudo.com/api/' + data.ip, data => {
            // Find location details from Google Geocode
            $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.location.latitude + ',' + data.location.longitude + '&key=' + apiKey, geoData => {
                //console.log(JSON.stringify(geoData, null, 2));    
                var address_components = geoData.results[0]["address_components"];
                $.each(address_components, field => {
                    //console.log(JSON.stringify(address_components[field], null, 2));
                    var isPostalCode = (address_components[field].types.indexOf("postal_code") > -1);
                    var isRegion = (address_components[field].types.indexOf("administrative_area_level_1") > -1);
                    if (isPostalCode) {
                        data.postal_code = address_components[field].long_name;
                    }
                    if (isRegion) {
                        data.region = {};
                        data.region.name = address_components[field].long_name;
                        data.region.code = address_components[field].short_name;
                    }
                });
                // The formatted address
                data.formatted_address = geoData.results[0]["formatted_address"];
                // Get the location's weather conditions
                $.getJSON('https://fcc-weather-api.glitch.me/api/current?lon=' + data.location.longitude + '&lat=' + data.location.latitude, weatherData => {
                    console.log(JSON.stringify(weatherData, null, 2));
                    data.weather = weatherData.main;
                    data.weather.temp = {
                        celsius: weatherData.main.temp,
                        kelvin: (273 + weatherData.main.temp),
                        fahrenheit: (weatherData.main.temp * 9 / 5 + 32)
                    };
                    data.weather.visibility = weatherData.visibility;
                    data.weather.wind = weatherData.wind;
                    data.weather.clouds = weatherData.clouds;
                    data.weather.conditions = weatherData.weather;
                    data.weather.aluminac = {
                        sunrise: weatherData.sys.sunrise,
                        sunset: weatherData.sys.sunset
                    };
                    data.weather.coord = weatherData.coord;
                    data.weather.sys = weatherData.sys;
                    callback(data);
                }).catch(e => console.error(e));
            }).catch(e => console.error(e));
        }).catch(e => console.error(e));
    }).catch(e => console.error(e));
};