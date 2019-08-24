// Promises information about the client's location
// state.location.geo


function getGeoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showGeoPosition);
    } else {
        state.set("geo-location", "Geolocation is not supported by this browser.");
    }
}
