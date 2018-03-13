function showLocalWeather() {
    var location = state["location"].location;
    // https://5dayweather.org/api.php?city=53574
    $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
        console.log(JSON.stringify(data, null, 2));
        $.getJSON('//5dayweather.org/api.php?city=' + data.zip_code, function (data) {
            console.log(JSON.stringify(data, null, 2));
        });
    });
}

(function () {


    //$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function (data) {
    //  console.log(JSON.stringify(data, null, 2));
    //});

    // Get the client's IP address
    $.getJSON('//api.ipify.org?format=jsonp&callback=?', data => {
        // Get the client's IP based location data
        $.getJSON('//geoip.nekudo.com/api/' + data.ip, data => {
            // Find the client's local IP address
            var findIP = new Promise(r => { var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }), b = () => { }; a.createDataChannel(""); a.createOffer(c => a.setLocalDescription(c, b, b), b); a.onicecandidate = c => { try { c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r) } catch (e) { } } })
            findIP.then(ip => {
                data.local_ip = ip;
                state["location"] = data;
                console.log(JSON.stringify(state["location"], null, 2));
                // Fixes data binding issue (Page reloading the dashboard)
                $("#ip-address").html(state["location"].ip);
                showLocalWeather();
            }).catch(e => console.error(e));
        });
    });
})();

// Finished
console.log("Finished loading: custom.js ");