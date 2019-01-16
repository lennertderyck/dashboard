# personal-startpage
## Use
Enter the url <a href="https://personal-startpage.lennertderyck.be" target="_blank" rel="noopener">personal-startpage.lennertderyck.be</a> in your browser and start browsing using my personal startpage.

Ofcourse you can clone my project so you can edit the buttons and more.

## Edit the personal startpage
### 1. Repo
- Fork or clone my repo.
- Make a new branch 'gh-pages'.
- Set up GitHub pages for this repo (Settings > GitHub Pages on the bottom).

### 2. Forestry.io
- Visit <a href="https://forestry.io/signup" target="_blank" rel="noopener">Forestry.io</a> and make an account.
Once your account is set up <a href="https://app.forestry.io/dashboard/#/add-site" target="_blank" rel="noopener">add your site</a>.
- Connect your GitHub repo with your personal startpage with Forestry.


### 3. Forestry settings
Now you should set up following settings
- Go to Settings (on the left) > General - Enter your GitHub Pages url
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
- If you want you can choose an icon. Add the code of an svg-file or fill in the code for a <a href"https://https://material.io/tools/icons/?icon=build&style=baseline" rel="noopener" target="_blank">Google</a>, <a href"https://fontawesome.com/icons?d=gallery&m=free" rel="noopener" target="_blank">Font awesome</a> or <a href"https://feathericons.com/" rel="noopener" target="_blank">Feather</a> icon.

## Adding themes
- Download this <a href="https://raw.githubusercontent.com/lennertderyck/personal-startpage/version-3.0-jekyll/css/theme-2f3132.css" target="_blank" rel="noopener">css-file</a>
- Edit the variables in the theme
- Upload the edited css-file to the 'css'-folder in the master branch
- Go to the admin page for your personal startpage (USERNAME.github.io/personal-startpage/admin) and go to 'Themes' in the navigation.
- Add a new theme
- Select the new theme on your personal startpage (click 'More')
