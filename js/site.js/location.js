//
// Get the user's GPS location, and save that into the state property
//
(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            state.set("geo-location", position.coords.latitude +
                ", " + position.coords.longitude);
        });
    } else {
        state.set("geo-location", "Geolocation is not supported by this browser.");
    }
})();

//
// Look-up user's IP address, and save into the state property
//
(() => {
    return new Promise((resolve, reject) => {
      $.getJSON('//api.ipify.org?format=jsonp&callback=?', data => {
        state.set("user-ip", data.ip);
        resolve(data);
      }).catch(e => reject(e));
    })
})();

function UNUSED_REF_updateLocation(data) {
    // Save it to the state array
    state["location"] = data;
    console.log(JSON.stringify(state["location"], null, 2));
    // Fixes data binding issue (Page reloading the dashboard)
    $("#current-user").html(state.currentUser.email);
    $("#ip-address").html(state["location"].ip);
    $("#local-ip-address").html(state["location"].local_ip);
    $("#city").html(state["location"].city);
    $("#state").html(state["location"].region.name);
    var weather = Math.roundDecimal(state.location.weather.temp.fahrenheit, 0) + '&deg;F and ' + titleCase(state.location.weather.conditions[0].description);
    $("#weather").html(weather);
}

function UNUSED_REF_getLocationInformation(apiKey, callback) {
    // Get the client's IP address
    $.getJSON('//api.ipify.org?format=jsonp&callback=?').then(ipData => {
        console.log("ip-data: " + ipData);
        // Get the client's IP based location data
        $.getJSON('//geoip.nekudo.com/api/' + ipData.ip).then(data => {
            // Find location details from Google Geocode
            console.log("location: " + data.location);
            //console.log(JSON.stringify(data, null, 2));
        }).catch(e => console.error(e));
    }).catch(e => console.error(e));
};


