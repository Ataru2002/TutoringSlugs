# Prerequisites
You must have Node.js installed.

# Install dependencies

`npm i`

# Run

`npm run start`

The web server will be running on [http://localhost:8080](http://localhost:8080)

# Current endpoints

### `GET /course/list`
Params: none

Returns a list of all courses. 
### `GET /course/get`
Query params: 
- id (ex: cse-40)

Returns course info as object. 

### `POST /course/tutor`
Params (url-encoded):
- userId
- name
- courseId

Signs up the student as a tutor for a course. Returns a test message for now.

### `POST /auth/login`
Params (url-encoded):
- token (token from firebase when logged in on the frontend)

# TODO:
- make sure refresh token works with login
- maybe lookin to firebase's refresh token instead of our own?
- logout (delete refresh token)
- apis: edit user settings on firebase

once database is implemented:
- properly implement course apis
- paginate course/get
