
// Not used, but does it work (like pageNaviagte but an angular approach)?
function loadPageName(pageName) {
    fabspaApp.run([
        "$rootScope",
        "$location",
        function ($rootScope, $location) {
            // register listener to watch route changes
            $location.url("#!" + pageName);
        }
    ]);
}


// Finished
console.log("Finished loading: custom.js ");