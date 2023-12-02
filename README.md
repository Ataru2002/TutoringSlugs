## Prerequisites
You must have Node.js installed.

## Install dependencies

`npm i`

## Run the Server

`npm run start` or `node .`

The web server will be running on [http://localhost:8080](http://localhost:8080)

## Run the website

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Current endpoints

### `GET /user/`
Params: userId

Gets userId from session cookie and returns user data in JSON

### `POST /user/updateUser`

Params:
- userId (string)
- email (string)
- phoneNumber (string)
- firstName (string)
- lastName (string)
- password (string)
- photoURL (string)

Updates user settings. Undefined or null values will not be updated.

### `POST /user/updateTutor`
Params:
- userId (string)
- phoneNumber (string)
- description (string)
- isPublic (boolean)
- coursesTutored (array of strings)
- selectedFile (string)
- selectedImg (string)
- tutor (boolean)

Signs up the student as a tutor for a course or updates existing tutor information.

### `POST /auth/signup`
Params:
- userId (string)
- major (string)

Adds new user to the cloud firestore database.

### `POST /auth/login`
Params:
- userId (string)

Logs user in and returns a cookie for user session. Adds user to database if they do not exist yet.

### `POST /auth/logout`

Revokes user tokens.


## Project Directory Scripts

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Individual files

## Search.js

- This file contains the main page of the website and will be the place users can search for classes they need tutoring on. This feature would require another database to store all the courses and the class code associated with it. Which is why there's code associated with the firestore database in this file. When Search.js is loaded, a piece of code will run that fetches the data from a web-scrapper from a different file to add them all to the database. Note that there's a getDocs() first to prevent any duplicated data from entering into the database.

## SignUpSide.js

- This file uses the firebase authentication technology to allow users to signup using their email. For this project, the signup mechanism will only accept @ucsc.edu for the emails. Additionally, the authenticator also detect duplicated accounts, alert the user if the password is only less than 4 characters long.

## SignInSide.js

- This file utilizes the firebase authentication technology to allow users to sign in using the email that they just signed up. For this project, the sign in mechanism will alert the user if the password is incorrect by accessing the account within the database and perform a password check. Additionally, there will be a cookie created in order to keep the user signed in whenever the page is switched
