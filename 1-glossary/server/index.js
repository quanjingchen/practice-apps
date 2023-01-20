require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { retrieve, insert, update, remove } = require("./db.js");
const { sampleData } = require("./data.js");

const app = express();

// Use middleware
app.use(cors());
app.use(morgan());
app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));


app.get('/words', (req, res) => {
  console.log("IM IN GET");
  retrieve((err, data) => {
    if (err) {
      console.error('ERR WITH RETRIEVING DATA FROM DB: ', err);
      res.sendStatus(400);
    } else {
      // console.log('SUCCESS WITH RETRIEVING DATA FROM DB: ', data);
      res.status(200).json(data);
    }
  });

});

app.post('/words', (req, res) => {
  console.log("IM IN POST: ", req.body);
  var words = req.body;
  insert(words, (err, data) => {
    if (err) {
      console.error('ERR WITH ADDING DATA TO DB: ', err);
      res.sendStatus(400);
    } else {
      console.log('SUCCESS WITH ADDING DATA TO DB: ', data);
      res.sendStatus(201);
    }
  });
});

app.put('/words', (req, res) => {
  console.log("IM IN PUT: ", req.body);
  var filter = req.body._id;
  var data = req.body.definition;
  update({_id: filter}, {definition: data}, (err, data) => {
    if (err) {
      console.error('ERR WITH UPDATING DATA IN DB: ', err);
      res.sendStatus(400);
    } else {
      console.log('SUCCESS WITH UPDATING DATA IN DB: ', data);
      res.sendStatus(200);
    }
  })
});

app.delete('/words', (req, res) => {
  console.log("IM IN DELETE: ", req.body);
  var filter = req.body._id;
  remove({_id: filter}, (err, data) => {
    if (err) {
      console.error('ERR WITH DELETING DATA IN DB: ', err);
      res.sendStatus(405);
    } else {
      console.log('SUCCESS WITH DELETING DATA IN DB: ', data);
      res.sendStatus(202);
    }
  })
});


app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
