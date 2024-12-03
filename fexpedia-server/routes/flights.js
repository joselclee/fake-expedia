const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all flights
router.get('/', (req, res) => {
  const query = 'SELECT * FROM FlightData';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching flights:', err);
      res.status(500).send('Error fetching flights');
    } else {
      res.json(results);
    }
  });
});

// Get all flights
app.get('/flights', (req, res) => {
  const query = 'SELECT * FROM FlightData';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching flights:', err);
      res.status(500).send('Error fetching flights');
    } else {
      res.json(results);
    }
  });
});

// Get flight by ID
app.get('/flights/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM FlightData WHERE FlightNumber = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching flight:', err);
      res.status(500).send('Error fetching flight');
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;