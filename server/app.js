const express = require('express'); //packages
const cors = require('cors');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

//init
const app = express();
const PORT = 8080;

//extentintions
app.use(cors());
app.use(express.json());
app.use(express.static('output_images'));
app.use('/output_images', express.static('output_images'));

let ff;

let del_img;

//multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        //console.log(file)
        ff = file;
        cb(null, file.originalname)
    }
});

const uplode = multer({storage: storage})

//server
app.get("/", (req, res) => {
    res.send("uplode server")
})

app.post("/uplode", uplode.single("img"), (req, res) => {
    if (! del_img) {
        fs.unlink(`./output_images/${del_img}`, (err) => {
            if (err) {
                console.error(err)
            }else {
                console.log("output file deleted.")
            }
        })//./output_images/${img_name}
        fs.unlink(`./images/${del_img}`, (err) => {
            if (err) {
                console.error(err)
            }else {
                console.log("file deleted.")
            }
        })
        //./images/${img_name}
    }
    console.log(req.file)
    res.send("image uploded");
})

app.post("/filter", (req, res) => {
    const filter = req.body.filter;
    console.log(ff.originalname)
    exec(`py ./filter_program/main.py ${filter} ./images/${ff.originalname} ./output_images/${ff.originalname}`)


    del_img = ff.originalname
    res.end(filter)
})

app.post("/delete", (req, res) => {
    del_img = req.body.img_name;

    fs.unlink(`./output_images/${del_img}`, (err) => {
        if (err) {
            console.error(err)
        }else {
            console.log("output file deleted.")
        }
    })//./output_images/${img_name}
    fs.unlink(`./images/${del_img}`, (err) => {
        if (err) {
            console.error(err)
        }else {
            console.log("file deleted.")
        }
    })
    //./images/${img_name}

})

app.listen(PORT, () => {
    console.log('server started at ' + PORT);
})