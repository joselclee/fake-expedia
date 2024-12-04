const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all flights
router.get('/', (req, res) => {
  const { from, to, departureDate, returnDate } = req.query;
  let query = `
    SELECT f.*
    FROM FlightData f
    JOIN Fly fl ON f.FlightNumber = fl.FlightNumber
    WHERE 1=1
  `;
  const params = [];

  if (from) {
    query += ' AND fl.fromAirportID = ?';
    params.push(from);
  }
  if (to) {
    query += ' AND fl.toAirportID = ?';
    params.push(to);
  }
  if (departureDate) {
    query += ' AND DATE(fl.departureTime) = ?';
    params.push(departureDate);
  }
  if (returnDate) {
    query += ' AND DATE(fl.arrivalTime) = ?';
    params.push(returnDate);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error fetching flights:', err);
      res.status(500).send('Error fetching flights');
    } else {
      res.json(results);
    }
  });
});

// Get flight by ID
router.get('/flights/:id', (req, res) => {
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

// Get flights that user booked
router.get('/user/:userId/flights', (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT f.*
    FROM FlightData f
    JOIN Reservation r ON f.FlightNumber = r.FlightNumber
    WHERE r.CustomerID = ?
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user flights:', err);
      res.status(500).send('Error fetching user flights');
    } else {
      res.json(results);
    }
  });
});

// Get flights within a timeframe
router.get('/flights/timeframe', (req, res) => {
  const { start, end } = req.query;
  const query = `
    SELECT f.*
    FROM FlightData f
    JOIN Fly fl ON f.FlightNumber = fl.FlightNumber
    WHERE DATE(fl.departureTime) BETWEEN ? AND ?
  `;
  db.query(query, [start, end], (err, results) => {
    if (err) {
      console.error('Error fetching flights within timeframe:', err);
      res.status(500).send('Error fetching flights within timeframe');
    } else {
      res.json(results);
    }
  });
});

// Get flights going from a certain airport
router.get('/flights/from/:airportId', (req, res) => {
  const { airportId } = req.params;
  const query = `
    SELECT f.*
    FROM FlightData f
    JOIN Fly fl ON f.FlightNumber = fl.FlightNumber
    WHERE fl.fromAirportID = ?
  `;
  db.query(query, [airportId], (err, results) => {
    if (err) {
      console.error('Error fetching flights from airport:', err);
      res.status(500).send('Error fetching flights from airport');
    } else {
      res.json(results);
    }
  });
});

// Get flights going to a certain airport
router.get('/flights/to/:airportId', (req, res) => {
  const { airportId } = req.params;
  const query = `
    SELECT f.*
    FROM FlightData f
    JOIN Fly fl ON f.FlightNumber = fl.FlightNumber
    WHERE fl.toAirportID = ?
  `;
  db.query(query, [airportId], (err, results) => {
    if (err) {
      console.error('Error fetching flights to airport:', err);
      res.status(500).send('Error fetching flights to airport');
    } else {
      res.json(results);
    }
  });
});

// Get flights departing on a certain date
router.get('/flights/departing/:date', (req, res) => {
  const { date } = req.params;
  const query = `
    SELECT f.*
    FROM FlightData f
    JOIN Fly fl ON f.FlightNumber = fl.FlightNumber
    WHERE DATE(fl.departureTime) = ?
  `;
  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Error fetching flights departing on date:', err);
      res.status(500).send('Error fetching flights departing on date');
    } else {
      res.json(results);
    }
  });
});

// Get flights arriving on a certain date
router.get('/flights/arriving/:date', (req, res) => {
  const { date } = req.params;
  const query = `
    SELECT f.*
    FROM FlightData f
    JOIN Fly fl ON f.FlightNumber = fl.FlightNumber
    WHERE DATE(fl.arrivalTime) = ?
  `;
  db.query(query, [date], (err, results) => {
    if (err) {
      console.error('Error fetching flights arriving on date:', err);
      res.status(500).send('Error fetching flights arriving on date');
    } else {
      res.json(results);
    }
  });
});

module.exports = router;