const express = require('express'); //packages
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');

//init
const app = express();
const PORT = 8080;

//extentintions
app.use(cors());

//multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const uplode = multer({storage: storage})

//server
app.get("/", (req, res) => {
    res.send("uplode server")
})

app.post("/uplode", uplode.single("img"), (req, res) => {
    console.log(req.file)
    res.send("image uploded");
})

app.listen(PORT, () => {
    console.log('server started at ' + PORT);
})