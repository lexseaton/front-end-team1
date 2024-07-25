# nodejs-express-axios-starter

## How to start the application
1. Run `npm install` to install application dependencies
2. Start the application with `npm start` or `npm run dev` to reload the server when changes are made
3. To check that your application is running enter url http://localhost:3000/loginForm

## Running automated accessibility tests
When a front-end page is completed, the dev should add the url to the .pallyci file (ensure it is in quotes and each url is separated by commas).
You can find an example on <a href="https://d1ypz4osk65kt0.cloudfront.net/web/access.html" target="_blank">this page.</a>

On each pull request in the front end repo, the github action will automatically run accessibility tests. If you want to run pa11y locally, you can simply run this command: 
```
pa11y https://example.com
```
Read more about pa11y <a href="https://github.com/pa11y/pa11y/blob/main/README.md" target="_blank">here.</a>


## Backend
1. Follow the steps to run the backend for this application <a href="https://github.com/dylanlaffin/team1-api" target="_blank">here</a>

## Styling Frontend
1. To add reference links for styling to html script, in the <head> section insert {% include "links.html" %}. 
2. To add the navigation bar to your html script, inside the <body> insert {% include "heading.html" %}. 
3. To add footer to your html script, place footer before </body> closing tag by inserting {% include "footer.html" %}

## Tech Stack
Front-end: HTML, CSS, JavaScript, SwaggerUI, Docker

Back-end: Java, SQL

Testing: Jmeter, Selenium with Java, WAVE, axeDevTools, pa11y

## Credits
Developers: Gerard McLean, Hannah Morgan, Brigid Monaghan, Rachael McKeown, Jakub Rutkowski
Testers: Lex Seaton, Dylan Laffin