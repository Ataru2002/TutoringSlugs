# Prerequisites
You must have Node.js installed.

# Install dependencies

`npm i`

# Run

`npm run start`

The web server will be running on [http://localhost:8080](http://localhost:8080)

# Current endpoints

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

# TODO:

### `GET /course/list`
### `GET /course/get`
Work with nhan to implement above with his code.

- work with frontend to implement logout (delete cookie, redirect to signin screen)

- stretch: paginate tutor list

~~- make sure refresh token works with login~~

~~- maybe lookin to firebase's refresh token instead of our own?~~

~~- apis: edit user settings on firebase~~

~~- move firebase object to its own file~~
