# Tutoring Slugs

## Prerequisites
You must have Node.js installed.

## Run the website

### Install dependencies
### `npm i`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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



## Running the API server
For authentication and user actions to work on the website, you must have the API server running. 

Navigate to the `/api` directory.

### Install dependencies
`npm i`
### Run the Server
`node .`

The web server will be running on [http://localhost:8080](http://localhost:8080)

## API endpoints

### Testing the API
API endpoints for user actions will need authentication to run successfully. In a browser, this is done automatically through storing user data in the `session` cookie on login, and checking it on every API call. For testing in a non-browser environment, make sure to have cookies enabled.

### `GET /user/`
Authentication required: Yes 

Params: userId

Gets userId from session cookie and returns user data in JSON. Used to keep the user signed in.

### `POST /user/updateUser`
Authentication required: Yes

Params:
- userId (string)
- email (string)
- firstName (string)
- lastName (string)
- password (string)

Updates user settings. Undefined or null values will not be updated.

### `POST /user/updateTutor`
Authentication required: Yes

Params:
- userId (string)
- description (string)
- isPublic (boolean)
- coursesTutored (array of strings)
- tutor (boolean)

Signs up the student as a tutor for a course or updates existing tutor information.

### `POST /user/uploadProfilePhoto`
Authentication required: Yes

Request body:

- the image, in binary format

Uploads the user provided image to server storage.

### `POST /user/uploadTranscript`
Authentication required: Yes

Request body:

- the transcript, in binary format

Uploads the user provided transcript to server storage.


### `POST /auth/signup`
Authentication required: No

Params:
- userId (string)
- firstName (string)
- lastName (string)
- email (string)
- major (string)

Adds new user to the cloud firestore database.

### `POST /auth/login`
Authentication required: No

Params:
- userId (string)
- firstName (string)
- lastName (string)
- email (string)

Logs user in and returns a cookie for user session. Adds user to database if they do not exist yet.
