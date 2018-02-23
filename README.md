# lcc sharepoint prototype kit

An Express application to allow designers to quickly prototype designs on both desktop and mobile devices and to allow the business to comment early on in the design process.

The application includes both [lcc_frontend_toolkit](https://www.npmjs.com/package/lcc_frontend_toolkit) and [lcc_templates_nunjucks](https://www.npmjs.com/package/lcc_templates_nunjucks) npm packages.

The project was initially cloned from [govuk_prototype_kit](https://github.com/alphagov/govuk_prototype_kit) and provides detailed documentation on how to use the toolkit and how to deploy to [heroku](https://www.heroku.com/).

The steps to create a new prototype from this repo are as follows:

1. Clone this repo and rename to an appropriate name 

    ```bash 
    git clone https://github.com/lccgov/lcc_subsites_prototype.git <appropriate name> 
    ```
2. Remove .git folder and initialize empty Git repo 

    ```bash 
    git init 
    ```
3. Create new GitHub repo with the same name.
4. Add remote repo created in step 3 to local Git repo: 

    ```bash 
    git remote add origin https://github.com/lccgov/<GitHub repo> 
    ```
5. Create a new app in [Heroku](https://heroku.com/) with the same name as the repo.  Also, add config variables for username and password so that the general public are unable to access it and to prevent Google from crawling the site. N.B. The USERNAME and PASSWORD keys need to be UPPERCASE!
6. Update the .travis.yml file with the new Heroku app name and API key.  The API key must be encrypted using the [Travis CLI](https://docs.travis-ci.com/user/encryption-keys/) as it is being source controlled on GitHub publically.  The API Key can be found under Account Settings > API Key (scroll down) on the Heroku site. Open a the command line window inside your project directory run the following command (You may to have disconnect from the corporate network to run this) 

    ``` bash
    travis encrypt <api key> --add deploy.api_key 
    ```
    More information can be found on the [lcc_designer_setup_documentation repo](https://github.com/lccgov/lcc_designer_setup_documentation).
7. Log onto [Travis CI](https://travis-ci.org/profile/lccgov) and toggle the new repository so that Travis CI is aware when a push has taken place to that GitHub repository.
8. Perform an initial commit and push to GitHub, which will kick of a Travis CI build which will deploy the site to Heroku accessible at [appname].herokuapp.com.

NOTE:  We are also able to run the Node.js Express web application locally instead of pushing to Heroku by simply typing ‘gulp’ in the Integrated Terminal (Views/Integrated Terminal) in VS Code when the particular prototype project is open in the editor.  This will start a local web server, accessible at: [http://localhost:3000](http://localhost:3000) although the port can change if already in use by another process.
