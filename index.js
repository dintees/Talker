const express = require('express');
const path = require('path')
const port = 3000;
const app = express();

app.use(express.static('./book/dist/book'))

app.get('/', (req, res) => {
    res.send("laaa")
    res.sendFile('./index.html')
});


app.listen(port, () => {
    console.log("Server is listening on port "+port);
});