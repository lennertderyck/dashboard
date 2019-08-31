console.log('themes.js script running');

var cookieTheme = readCookie('theme');

// SET THEME & CHECK
/* function loadCss() {
    var cookieTheme = readCookie('theme');
    // document.getElementById("themeCss").href="https://personal-startpage.lennertderyck.be/css/theme-" + cookieTheme + ".css";

    addCssElement('style.css');

    // Include CSS file
    function addCssElement(filename){
        var head = document.getElementsByTagName('head')[0];
        var cookieThemeUrl = cookieTheme + '.css';

        var style = document.createElement('link');
        style.href = 'https://personal-startpage.lennertderyck.be/css/theme-' + cookieThemeUrl;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.append(style);
    }
} */
console.log('    ' + 'Theme is ' + cookieTheme);

addFavicon();

// ADD FAVICON
function addFavicon(){
    var head = document.getElementsByTagName('head')[0];
    var cookieThemeUrl = cookieTheme + '.ico';

    var style = document.createElement('link');
    style.rel = 'shortcut icon';
    style.type = 'image/x-icon';
    style.href = '../images/favicon-theme-' + cookieThemeUrl;
    head.append(style);
}

// SET THEMES > BUTTONS
/* function setTheme(themecolor) {
    createCookie('theme',themecolor,1000)
    var dialogWindows = document.getElementById("theme-dialog");
    var body = document.getElementById("body");
    dialogWindows.classList.remove("toggle-active");
    body.setAttribute('data-theme', themecolor)
} */

function setTheme(themecolor) {
    createCookie('theme',themecolor,1000)
    // var dialogWindows = document.getElementById("theme-dialog");
    // var body = document.getElementById("body");
    // dialogWindows.classList.remove("toggle-active");
    body.setAttribute('data-theme', themecolor)
}

cookieTheme = readCookie('theme');
body.setAttribute('data-theme', cookieTheme);
