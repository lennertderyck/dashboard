
// https://www.quirksmode.org/js/cookies.html
// CREATE COOKIES createCookie('ppkcookie','testcookie',7)
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

// READ COOKIES readCookie('ppkcookie1')
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// SET THEMES > BUTTONS
function setThemeDark() {
    createCookie('theme','dark',1000)
    //document.cookie = "theme=dark" + ";domain=127.0.0.1; expires=18 Dec 2034 12:00:00 UTC;";
    location.reload();
}
function setThemeDefault() {
    createCookie('theme','default',1000)
    //document.cookie = "theme=default" + ";domain=127.0.0.1; expires=18 Dec 2034 12:00:00 UTC;";
    location.reload();
}

// SET THEME & CHECK
function loadCss() {
    var cookieTheme = readCookie('theme');
    //document.getElementById("themeCss").href="https://personal-startpage.lennertderyck.be/css/theme-" + cookieTheme + ".css";

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

    var cookieThemeValue = readCookie('theme');
    console.log('Theme stat = javascript working');
    console.log('Theme is ' + cookieThemeValue);
}