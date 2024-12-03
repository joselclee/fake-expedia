const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all reservations for a customer
router.get('/customers/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Reservation WHERE CustomerID = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      res.status(500).send('Error fetching reservations');
    } else {
      res.json(results);
    }
  });
});

// Create a new reservation
app.post('/reservations', (req, res) => {
    const { Date, Passengers, TotalFare, CustomerID } = req.body;
    const query = 'INSERT INTO Reservation (Date, Passengers, TotalFare, CustomerID) VALUES (?, ?, ?, ?)';
    db.query(query, [Date, Passengers, TotalFare, CustomerID], (err, results) => {
      if (err) {
        console.error('Error creating reservation:', err);
        res.status(500).send('Error creating reservation');
      } else {
        res.json({ ReservationNumber: results.insertId });
      }
    });
  });
  
  // Get all reservations for a customer
  app.get('/customers/:id/reservations', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Reservation WHERE CustomerID = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching reservations:', err);
        res.status(500).send('Error fetching reservations');
      } else {
        res.json(results);
      }
    });
  });
  
  // Get reservations by date
  app.get('/reservations/date/:date', (req, res) => {
    const { date } = req.params;
    const query = 'SELECT * FROM Reservation WHERE Date = ?';
    db.query(query, [date], (err, results) => {
      if (err) {
        console.error('Error fetching reservations:', err);
        res.status(500).send('Error fetching reservations');
      } else {
        res.json(results);
      }
    });
  });
  
module.exports = router;