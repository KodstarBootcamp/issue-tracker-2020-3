Backend

The backend server is built with Express.js and Node.js, which provides completed REST APIs for data interaction.

- Node.js
node.js installed from http://nodejs.org

- Database
MongoDB atlas is used as the backend database.

Mongoose is used to access the MongoDB for post, get, put and delete.

PORT: http://localhost:5000

RESTful API between backend and web/mobile is documented
// https://app.swaggerhub.com/apis/Kodstar/Issue_Tracker_3/1.0.1

- Usage

Running locally you need 2 terminals open: one for server, and another one for MongoDB backend. 

-Install node.js; 

-git clone master branch

Go to directory issue-tracker-2020-3, and run npm install;
Go to directory backend, and run npm install;

-installed packages
* npm install express mongoose cors nodemon dotenv eslint;
* .env file added in backend directory. 
(The .env file is in the files of teams group-3.)

In backend directory for started database: npm run dev;

Go to http://localhost:5000/ to check the live application.
