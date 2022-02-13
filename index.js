const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, './book/dist/book')))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/query', (req, res) => {
    console.log(req.body)
    let obj = {
        action: req.body.action,
        success: true,
        message: "OK"
    }
    res.send(obj)
})


app.listen(port, () => {
    console.log("Server is listening on port " + port);
});