# personal-startpage
## Use
Enter the url <a href="https://personal-startpage.lennertderyck.be" target="_blank" rel="noopener">personal-startpage.lennertderyck.be</a> in your browser and start browsing using my personal startpage.

Ofcourse you can clone my project so you can edit the buttons and more.

### Themes
By default there are two themes, a light theme and a dark theme. The first time you visist the page a notification will be shown asking you wich theme you want to apply. If you want to change the theme, simply click 'More' and select the theme you want.

### Adding themes
Adding a theme is not so hard.
Just copy the css variables of an other theme, choose the colors you want to apply and save the theme. The name of the theme has to be 'theme-[HEX-CODE WITHOUT # COMES HERE]'. The name should be a HEX-code (without the hashtag) because this is used to change the color of the menubar in some browsers.

After you added the css-file, add a button (to the notification en 'More'-window) and copy the code of one of the other buttons. Change the value after the 'theme' part to the same value you chose for the name of the css file.
```js
createCookie('theme','HEX-CODE WITHOUT # COMES HERE',1000)
```

If you want to choose a favicon, just copy one of the existing ico-files (either dark or light) and change the name of the copied ico-file like you did for the css-file.

after that you're done.
