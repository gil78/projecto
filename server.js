const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
var bodyParser = require('body-parser')

// create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'formacao_react'
});

// create an express app
const app = express();

app.use(cors({
  origin: '*'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// connect to the database
connection.connect();

// create a route to retrieve data from the database
app.get('/contactos', (req, res) => {
  // query the database
  connection.query('SELECT * FROM contactos', (err, results) => {
    if (err) {
      // return an error message if there is an error
      res.status(500).json({
        error: 'Error retrieving data from the database'
      });
    } else {
      // return the data if the query is successful
      res.json(results);
    }
  });
});

// create a route to insert data into the database
app.post('/contactos',(req, res) => {
    // get the data to insert from the request body
    const data = req.body;

    // insert the data into the database
    connection.query('INSERT INTO contactos SET ?', data, (err, result) => {
      if (err) {
        // return an error message if there is an error
        res.status(500).json({
          error: 'Error inserting data into the database'
        });
      } else {
        // return the result if the query is successful
        res.json(result);
      }
    });
});

// create a route to update data in the database
app.put('/contactos/:id',(req, res) => {
    // get the data to update and the id of the row to update from the request body
    const data = req.body;
    const id = req.params.id;
    // update the data in the database
    connection.query('UPDATE contactos SET ? WHERE id = ?', [data, id], (err, result) => {
      if (err) {
        // return an error message if there is an error
        res.status(500).json({
          error: 'Error updating data in the database'
        });
      } else {
        // return the result if the query is successful
        res.json(result);
      }
    });
  });

// create a route to delete data from the database
app.delete('/contactos/:id',(req, res) => {
    // get the id of the row to delete from the request params
    const id = req.params.id;
  
    // delete the data from the database
    connection.query('DELETE FROM contactos WHERE id = ?', id, (err, result) => {
      if (err) {
        // return an error message if there is an error
        res.status(500).json({
          error: 'Error deleting data from the database'
        });
      } else {
        // return the result if the query is successful
        res.json(result);
      }
    });
  });
  

// start the server on port 4000
app.listen(4000, () => {
  console.log('Servidor está a escutar na porta 4000');
});
