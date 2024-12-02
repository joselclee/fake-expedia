// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'fexpediadb'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Define routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Fexpedia API');
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

// Get customer profile
app.get('/customers/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Customer WHERE CustomerID = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching customer profile:', err);
      res.status(500).send('Error fetching customer profile');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new customer
app.post('/customers', (req, res) => {
  const { Email, Preferences, Rating, CreditCard, LastName, FirstName, Address, City, State, Zip, Telephone } = req.body;
  const personQuery = 'INSERT INTO Person (LastName, FirstName, Address, City, State, Zip, Telephone) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(personQuery, [LastName, FirstName, Address, City, State, Zip, Telephone], (err, personResults) => {
    if (err) {
      console.error('Error creating person:', err);
      res.status(500).send('Error creating person');
    } else {
      const personID = personResults.insertId;
      const customerQuery = 'INSERT INTO Customer (CustomerID, Email, Preferences, Rating, CreditCard) VALUES (?, ?, ?, ?, ?)';
      db.query(customerQuery, [personID, Email, Preferences, Rating, CreditCard], (err, customerResults) => {
        if (err) {
          console.error('Error creating customer:', err);
          res.status(500).send('Error creating customer');
        } else {
          res.json({ CustomerID: personID });
        }
      });
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});