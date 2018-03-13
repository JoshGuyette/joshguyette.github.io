// This just set's the pagePath page link on the
// navbar to bold, and the rest of the navbar links to normal
function setNavElementBold(pagePath) {
  for (var page in navbar.elements)
  {
    var path = navbar.elements[page].path;
    var element = $("#href-" + path);
    if (path == pagePath) {
      element.css("font-weight", "bold");
    } else {
      element.css("font-weight", "normal");
    }
  }
}

// Used for dynamic routing
function getPageUrl(pagePath)
{
  for (var page in navbar.elements)
  {
    var thisPage = navbar.elements[page];
    var path = thisPage.path;
    if (path == pagePath) {
      return thisPage.url;
    }
  }
  return "";
}

// Function to navigate to a different content-page
function pageNavigate(pageName) {
  var id = "#href-" + pageName;
  $(id).click();
}

// Finished
console.log("Finished loading: navbar.js ");