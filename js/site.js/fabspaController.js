//
// Angularjs controller, config, and initialization
//
// This is completely dynamic, there should be no need to modify this file
// unless your are tracing a bug. the 'config' and 'navbar' variables are bound
// to the $rootScope already.
//
var fabspaApp = angular.module("fabspaApp", ["ngRoute"]);
fabspaApp
  .controller("fabspaController", [
    "$rootScope",
    "$scope",
    function ($rootScope, $scope) {
      //
      // Set $scope (bindings for partial pages)
      //
      $scope.currentUser = firebase.auth().currentUser
        ? firebase.auth().currentUser.email
        : "Guest";

      // Tells a nav link if it's hidden or not.
      $scope.isValid = function (path) {
        var user = firebase.auth().currentUser;
        for (var page in $rootScope.navbar.elements) {
          var p = $rootScope.navbar.elements[page].path;
          if (p == path) {
            var types = $rootScope.navbar.elements[page].types;
            return !isPageValid(user, types);
          }
        }
        return false;
      };

      //
      // Set $rootscope (bindings for any page)
      //
      $rootScope.config = config;
      $rootScope.navbar = navbar;
      $rootScope.indexPage = indexPage;
      $rootScope.state = state;
      $rootScope.globalCssLinks = indexPage.cssSheets;
      $rootScope.javaScripts = indexPage.javaScripts;

      //
      // Push some global functions on to the scope, so pages have access to them
      //
      loadScopeFunctions($rootScope);
    }
  ])
  .config(function ($routeProvider) {
    // Dynamic Routing
    $routeProvider
      .when("/", {
        templateUrl: "pages/site.html/loading.html",
        controller: "fabspaController"
      })
      .when("/:name*", {
        templateUrl: function (urlattr) {
          return getPageUrl(urlattr.name);
        },
        controller: "fabspaController"
      })
      .otherwise({
        redirectTo: "/"
      });
  })
  .run([
    "$rootScope",
    "$location",
    "$route",
    function ($rootScope, $location, $route) {
      // register listener to watch route changes
      $rootScope.$on("$routeChangeStart", function (event, next, current) {
        var user = firebase.auth().currentUser;
        var isLoggedIn = user != null;
        var currentPage = current ? current.params.name : null;
        var nextPage = next ? next.params.name : null;

        // Site reloads
        if (next && (typeof current == "undefined") && (typeof next.templateUrl == "undefined")) {
          $location.path("/");
          return;
        }
        if (next && next.templateUrl == "pages/loading.html") {
          return;
        }

        // Just ignore these
        if (!next || !current) {
          //console.log("Note: Unhandled $routeChangeStart detected.");
          return;
        }

        // Remove third-party driven route changes (like those from bootstrap tabs)
        // Note: The (nextPage == currentPage) is a fix for mobile browsers.
        if (typeof next.templateUrl == "undefined" || nextPage == currentPage) {
          event.preventDefault();
          return;
        }

        // Force user to stay on valid pages
        if (!protectNavBar(nextPage)) {
          //console.log("Note: Caught an invalid page");
          event.preventDefault();
        }

        // Hide the menu from the hamburger button if it's shown
        if ($("#navbar-content").hasClass("show")) $("#navbar-toggle").click();
      });

      $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        var currentPage = current ? current.params.name : null;
        var nextPage = next ? next.params.name : null;
        setNavElementBold(nextPage);
        $("title").html($rootScope.indexPage.titlePrefix + titleCase(nextPage) + $rootScope.indexPage.titleSuffix);
      });

      $rootScope.$on("$routeChangeError", function (event, next, current) {
        console.log("$routeChangeError");
      });
    }
  ]);

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
console.log("Finished loading: fabspaController.js ");
