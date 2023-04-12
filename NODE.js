const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/mydatabase";

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;

  const collection = client.db("mydatabase").collection("mycollection");

  app.post('/submit', (req, res) => {
    const data = {
      // data from your form
    };
    collection.insertOne(data, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });

  app.get('/data', (req, res) => {
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.listen(port, () => {
    console.log("Server running on port ${port}");
  });
});


<form method="POST" action="/submit">
  <input type="submit" value="Submit">
</form>
fetch('/data')
  .then(response => response.json())
  .then(data => {
    // manipulate the DOM with data
  });