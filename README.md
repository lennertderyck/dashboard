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
*Forestry is the easiest way of managing your startpage. If you have some experience with Jekyll you can also try it using a code Editor, but Forestry makes it very easy to update stuff.*
- Visit <a href="https://forestry.io/signup" target="_blank" rel="noopener">Forestry.io</a> and make an account.
Once your account is set up <a href="https://app.forestry.io/dashboard/#/add-site" target="_blank" rel="noopener">add your site</a>.
- Connect your GitHub repo with your personal startpage with Forestry


### 3. Forestry settings
Now you should set up following settings
- Go to Settings (on the bottom left) > General - Enter your GitHub Pages url
- On the same page click on 'Deploy admin' (beneath the time-setting)
- Save settings

- Go to Settings > Deploy - Choose the option 'GitHub Pages', connect to GitHub, choose your repo that you set up and choose the branch 'gh-pages'

- Go to Settings > Build - And set the toggle for 'Deploy on git push' on on.

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
- Find the css-file named 'themes.css' in the css folder
- Add your theme like in the example below and edit the colors (the blue text in the example below)
```css
[data-theme*="yourthemename"] {
    --bg-main: #3E4041;
    --bg-notif: #2F3132;
    --accent-1: #2F3132;
    --accent-2: rgb(34, 34, 34);
    --color: #e0e0e0; /* Main text color */
    --color-notif: white;
    --fill-fastnav-stack: white;
    --fill-fastnav-route: white;
    --close-x-color: white; /* The color of the X in the settings-box */
}
```
- Add a button in the index.html file and between the quotation marks in the javascript function you fill in the name of your theme 
```html
<button onclick="setTheme('yourthemename')">set dark theme</button>
```
- Now go to your personal startpage and click on the button to set your theme

You can also add multiple buttons for multiple themes:

```html
<button onclick="setTheme('black')">set dark theme</button>
<button onclick="setTheme('default')">set dark theme</button>
<button onclick="setTheme('deepseablue')">set dark theme</button>
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
