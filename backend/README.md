# Issue Tracker Backend

The backend server is built with Express.js and Node.js, which provides completed REST APIs for data interaction.

Node.js node.js installed from http://nodejs.org

Database MongoDB is used as the backend database.

## Local variables
- PORT
- MONGODB_URI
- TEST_MONGODB_URI
- CUSTOM_MONGODB_URI
- SECRET

## Api Documentation

- Go to [Swagger Editor](https://editor.swagger.io/)

- Drop api-receipt-1.0.4.yaml to editor
- or try other swagger extensions/plugins on your IDE


## Usage

- Install node.js

- Go to directory issue-tracker-2020-3/backend, and run npm install

- Add .env file for environment variables

- For run with mongodb-local run 'npm run local'
    - Local URI will be printed on console. It can use for Compass tool.
    - If the port number of the URI (on console) different from the port number that is written at mongodb.js change the port number at the file.
    - For shut down server send GET request to '/mongodb/stop'
    - For erase all data from server send DELETE request to '/mongodb/all'

- For run custom URI assign CUSTOM_MONGODB_URI environment variable(.env) run 'npm run custom-db'

- for other run modes look scripts at packages.json (npm start, npm run dev, etc.)


Go to http://localhost:<PORT\> to check the application.
