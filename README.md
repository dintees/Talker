# Talker
An instant messenger written as a real-time web application that uses WebSocket technology.

The application allows new users to join and write messages to each other. Also there is shown the activity status of others. When the page is refreshed, the user is automatically logged in with the previous nickname.

## Technology

**Front-end**:
- React
- socket.io-client

**Back-end**:
- NodeJS
- socket.io

## Setup
Install the necessary modules by running the following command in the `client` and `server` directory

```bash
npm install
```

To make the application work, you need to start the server (in the `server` directory)
```bash
node index.js
```

... and the client (in the `client` directory)
```bash
npm start
```

The website should be available at the address: `http://localhost:3000/`.

![login_page](https://user-images.githubusercontent.com/41068795/220274027-6a10ed54-3795-4dae-92c2-4fa8d0f1833e.png)

And now you can already exchange messages :smile:

![messages](https://user-images.githubusercontent.com/41068795/220274371-b02fc725-69b2-48b9-9047-d02986ed5919.png)
