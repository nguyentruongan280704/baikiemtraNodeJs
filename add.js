const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const e = require("express");

// bước 1
app.get("/api/v1/todos", (req, res) => {
  fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let status = JSON.parse(data);
      console.log(status);
      res.status(200).json(status);
    }
  });
});
// bước 2
app.get("/api/v1/todos/:id", (req, res) => {
    console.log(req.params.id);
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
        if (err) {
            throw err;
        }else{
            let statis = JSON.parse(data);
            let users = statis.find((e) => e.id == req.params.id);
            res.status(200).json(users)
        }
    })
})
// bước 3
app.post("/api/v1/todos", (req, res) => {
    console.log(req.body);
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
        if (err){
            throw err
        }else{
            let statis = JSON.parse(data);
            console.log(statis);
            let users = statis.find((e) => e.title == req.body.title)
        if(!users){
            let urss = {
                ...req.body,
                userId : Number(req.body.userId),
                id: Number(req.body.id),
                completed: Number(req.body.completed)
            }
            statis.push(urss)
            fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
                if(err){
                    throw err
                }else{
                    res.status(200).json({message: "Create successfully" })
                }
            })
        }else{
            res.status(200).json({message: "Todo already exists"})
            
        }
        }
    })
})
// bước 4
app.put("/api/v1/todos/:id", (req, res) => {
    console.log(req.body);
    fs.readFile(`${__dirname}/dev-data/todos.json`, (err, data) => {
        if (err){
            throw err;
        }
        let ueee = JSON.parse(data)
        let studio = ueee.findindex((e) => e.id == req.body.id)
        console.log(studio);
        if(studio == -1){
            res.status(200).json({message: 'Question not found' })
        }else if(studio >= 0){
            let update = {
                ...req.body,
                userId : Number(req.body.userId),
                id: Number(req.body.id),
                completed: Number(req.body.completed)
            }
            ueee[studio] = update
            fs.readFile(`${__dirname}/dev-data/todos.json`, JSON.stringify(ueee), (err) => {
                if(err){
                    console.log(err);
                    res.status(500).json({message: err })
                }else{
                    res.status(200).json({message: 'Update successfully' })
                }
            })
        }
            
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});
