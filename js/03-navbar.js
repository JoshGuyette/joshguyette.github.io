// A vital piece of routing security, this function determines if a user has
// access to a page, based on the page-types lised in the page's navbar.elements entry
//
// Args: The currentUser and the .types for the page in question
function isPageValid(user, types)
{
  var isLogout = (types.indexOf("logout") > -1);
  var isHome = (types.indexOf("home") > -1);
  var isAuthPage = (types.indexOf("authentication") > -1);
  var isSite = (types.indexOf("site-page") > -1);
  var isUser = (types.indexOf("user-page") > -1);
  var isProtected = (types.indexOf("email-verify-required") > -1);

  var hasAuthenticated = (user != null);
  var hasVerifiedEmail = (user && user.emailVerified);
  
  // A list of rules under which this function return true
  return (isSite && !isAuthPage) ||
         (isSite && isAuthPage && !hasAuthenticated) ||
         (isUser && !isProtected && hasAuthenticated) ||
         (isUser && isProtected && hasVerifiedEmail) ||
         (isLogout && hasAuthenticated);
}

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

// Function to navigate to a different content-page
function pageNavigate(pageName) {
  var id = "#href-" + pageName;
  $(id).click();
}

// Finished
console.log("Finished loading: navbar.js ");