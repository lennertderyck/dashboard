# personal-startpage
## Use
Enter the url <a href="https://personal-startpage.lennertderyck.be" target="_blank" rel="noopener">personal-startpage.lennertderyck.be</a> in your browser and start browsing using my personal startpage.

Ofcourse you can clone my project so you can edit the buttons and more.

## Edit the personal startpage
### 1. Repo
- Fork or clone my repo. I recommend opening the repo in GitHub Desktop (click on 'Open in Desktop' after clicking the green button) when you don't have a lot experience with using Command Prompt, Terminal or git in general.
- Make a new branch 'gh-pages' (You can do this by clicking on the branch-button on the GitHub page and just entering a name)
- Set up GitHub pages for this repo (Settings > GitHub Pages on the bottom)

### 2. Forestry.io
*Forestry is the easiest way of managing your startpage. If you have some experience with Jekyll you can also try it using a code Editor, but Forestry makes it very easy to update content.*
- Visit <a href="https://forestry.io/signup" target="_blank" rel="noopener">Forestry.io</a> and make an account.
Once your account is set up <a href="https://app.forestry.io/dashboard/#/add-site" target="_blank" rel="noopener">add your site</a>.
- Connect your GitHub repo with your personal startpage with Forestry

- Go to the Settings page
- Scroll to the **Projects path** section, where you can find the **Admin path** setting
- Fill in ```/admin/``` and click on 'Deploy Admin'

### 4. GitHub Pages admin
Enter the GitHub Pages url from before and put '/admin' after it.
Now you can edit the quicklinks and themes at the left side.

## Adding quicklinks
- Go to the admin page for your personal startpage (USERNAME.github.io/personal-startpage/admin) and go to 'Quicklinks' in the navigation.
- Add a quicklink
- Choose a name for the button
- Enter the url
- If you want you can choose an icon. Add the code of an svg-file or fill in the code for a <a href="https://material.io/tools/icons/?icon=build&style=baseline" rel="noopener" target="_blank">Google</a>, <a href="https://fontawesome.com/icons?d=gallery&m=free" rel="noopener" target="_blank">Font awesome</a> or <a href="https://feathericons.com/" rel="noopener" target="_blank">Feather</a> icon. They are all supported by default.

## Adding themes
- Find the css-file named **_main.scss** in the **_sass folder**
- Find the **Themes section**
- Add your theme like in the example below and edit the colors (the blue text in the example below)
```css
[data-theme*="yourthemename"] {
    --accent-main: #4285F4;
    --accent-1: #3E4041;
    --accent-2: #2F3132;
    --accent-2-dark: #222222;
    --txt-color: white;
    --icons: white;
    --searchbar-color: #e0e0e0;
    --settings-bg-color: #222222;
}
```
- Add a button in the index.html file and between the quotation marks in the javascript function you fill in the name of your theme (this place will be **indecated with ```<!--Themebuttons-->```**)
```html
<button onclick="setTheme('yourthemename')">set dark theme</button>
```

You can also add multiple buttons for multiple themes:

```html
<button onclick="setTheme('black')">set dark theme</button>
<button onclick="setTheme('default')">set default theme</button>
<button onclick="setTheme('deepseablue')">set deepseablue theme</button>
```

```css
[data-theme*="black"] {
    /* Color settings */
}

[data-theme*="default"] {
    /* Color settings */
}

[data-theme*="deepseablue"] {
    /* Color settings */
}
```

## Extras
### Live preview
If you have Jekyll installed on your computer, you can make use of the Live preview function. This plugin will refresh your browser automatically after every adjustment to your code. This plugin is already installed.

### Chrome plugin – New Tab Redirect
When you open a new tab in Chrome, the standard screen will be shown. This plugin redirects you to a custom url that you can set in the settings of the extension.

<a href="https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna" target="_blank" rel="noopener">Download New Tab Redirect for Chrome</a>
