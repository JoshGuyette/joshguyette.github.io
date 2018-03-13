function updateLocation(data) {
    // Save it to the state array
    state["location"] = data;
    console.log(JSON.stringify(state["location"], null, 2));
    // Fixes data binding issue (Page reloading the dashboard)
    $("#ip-address").html(state["location"].ip);
    $("#local-ip-address").html(state["location"].local_ip);
    $("#city").html(state["location"].city);
    $("#state").html(state["location"].region.name);
    var weather = Math.roundDecimal(state.location.weather.temp.fahrenheit, 0) + '&deg;F and ' + titleCase(state.location.weather.conditions[0].description);
    $("#weather").html(weather);
}
getLocationInformation(config.firebaseInit.apiKey, data => updateLocation(data));

// Finished
console.log("Finished loading: custom.js ");