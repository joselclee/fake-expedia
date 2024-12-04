const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get customer profile
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT c.CustomerID, c.Email, c.Preferences, c.Rating, c.CreditCard,
           p.LastName, p.FirstName, p.Address, p.City, p.State, p.Zip, p.Telephone
    FROM Customer c
    JOIN Person p ON c.CustomerID = p.PersonID
    WHERE c.CustomerID = ?
  `;
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
router.post('/', (req, res) => {
  const { email, Preferences, Rating, CreditCard, LastName, FirstName, Address, City, State, Zip, Telephone } = req.body;
  const personQuery = 'INSERT INTO Person (LastName, FirstName, Address, City, State, Zip, Telephone) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(personQuery, [LastName, FirstName, Address, City, State, Zip, Telephone], (err, personResults) => {
    if (err) {
      console.error('Error creating person:', err);
      res.status(500).send('Error creating person');
    } else {
      const personID = personResults.insertId;
      const customerQuery = 'INSERT INTO Customer (CustomerID, email, Preferences, Rating, CreditCard) VALUES (?, ?, ?, ?, ?)';
      db.query(customerQuery, [personID, email, Preferences, Rating, CreditCard], (err, customerResults) => {
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

// Update customer profile
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { email, Preferences, Rating, CreditCard, LastName, FirstName, Address, City, State, Zip, Telephone } = req.body;
  const query = 'UPDATE Customer SET Email = ?, Preferences = ?, Rating = ?, CreditCard = ? WHERE CustomerID = ?';
  db.query(query, [email, Preferences, Rating, CreditCard, id], (err, results) => {
    if (err) {
      console.error('Error updating customer profile:', err);
      res.status(500).send('Error updating customer profile');
    } else {
      const personQuery = 'UPDATE Person SET LastName = ?, FirstName = ?, Address = ?, City = ?, State = ?, Zip = ?, Telephone = ? WHERE PersonID = ?';
      db.query(personQuery, [LastName, FirstName, Address, City, State, Zip, Telephone, id], (err, personResults) => {
        if (err) {
          console.error('Error updating person:', err);
          res.status(500).send('Error updating person');
        } else {
          res.send('Customer profile updated successfully');
        }
      });
    }
  });
});

// Delete customer
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Customer WHERE CustomerID = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting customer:', err);
      res.status(500).send('Error deleting customer');
    } else {
      const personQuery = 'DELETE FROM Person WHERE PersonID = ?';
      db.query(personQuery, [id], (err, personResults) => {
        if (err) {
          console.error('Error deleting person:', err);
          res.status(500).send('Error deleting person');
        } else {
          res.send('Customer deleted successfully');
        }
      });
    }
  });
});

// Get all customers
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Customer';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      res.status(500).send('Error fetching customers');
    } else {
      res.json(results);
    }
  });
});

// Customer login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `
    SELECT c.CustomerID, p.FirstName, p.LastName, c.Email
    FROM Customer c
    JOIN Person p ON c.CustomerID = p.PersonID
    WHERE c.Email = ? AND c.Password = ?
  `;
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Error logging in');
    } else if (results.length === 0) {
      res.status(401).send('Invalid email or password');
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;