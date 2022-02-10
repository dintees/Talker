const express = require('express');
const path = require('path')
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, './book/dist/book')))


app.get("/query", (req,res) => {
    var obj = { action: "TEST", success: true, message: "OK" }
    res.send(JSON.parse(obj))
})


app.listen(port, () => {
    console.log("Server is listening on port " + port);
});