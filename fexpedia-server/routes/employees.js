const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Get all employees
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Employee';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).send('Error fetching employees');
    } else {
      res.json(results);
    }
  });
});

// Get employee by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Employee WHERE EmployeeID = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching employee:', err);
      res.status(500).send('Error fetching employee');
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new employee
router.post('/', (req, res) => {
  const { SSN, HourlyRate, StartDate, LastName, FirstName, Address, City, State, Zip, Telephone } = req.body;
  const personQuery = 'INSERT INTO Person (LastName, FirstName, Address, City, State, Zip, Telephone) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(personQuery, [LastName, FirstName, Address, City, State, Zip, Telephone], (err, personResults) => {
    if (err) {
      console.error('Error creating person:', err);
      res.status(500).send('Error creating person');
    } else {
      const personID = personResults.insertId;
      const employeeQuery = 'INSERT INTO Employee (EmployeeID, SSN, HourlyRate, StartDate) VALUES (?, ?, ?, ?)';
      db.query(employeeQuery, [personID, SSN, HourlyRate, StartDate], (err, employeeResults) => {
        if (err) {
          console.error('Error creating employee:', err);
          res.status(500).send('Error creating employee');
        } else {
          res.json({ EmployeeID: personID });
        }
      });
    }
  });
});

// Update employee
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { SSN, HourlyRate, StartDate, LastName, FirstName, Address, City, State, Zip, Telephone } = req.body;
  const employeeQuery = 'UPDATE Employee SET SSN = ?, HourlyRate = ?, StartDate = ? WHERE EmployeeID = ?';
  db.query(employeeQuery, [SSN, HourlyRate, StartDate, id], (err, results) => {
    if (err) {
      console.error('Error updating employee:', err);
      res.status(500).send('Error updating employee');
    } else {
      const personQuery = 'UPDATE Person SET LastName = ?, FirstName = ?, Address = ?, City = ?, State = ?, Zip = ?, Telephone = ? WHERE PersonID = ?';
      db.query(personQuery, [LastName, FirstName, Address, City, State, Zip, Telephone, id], (err, personResults) => {
        if (err) {
          console.error('Error updating person:', err);
          res.status(500).send('Error updating person');
        } else {
          res.send('Employee updated successfully');
        }
      });
    }
  });
});

// Delete employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const employeeQuery = 'DELETE FROM Employee WHERE EmployeeID = ?';
  db.query(employeeQuery, [id], (err, results) => {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).send('Error deleting employee');
    } else {
      const personQuery = 'DELETE FROM Person WHERE PersonID = ?';
      db.query(personQuery, [id], (err, personResults) => {
        if (err) {
          console.error('Error deleting person:', err);
          res.status(500).send('Error deleting person');
        } else {
          res.send('Employee deleted successfully');
        }
      });
    }
  });
});

// Employee login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `
    SELECT e.EmployeeID, p.FirstName, p.LastName, e.email
    FROM Employee e
    JOIN Person p ON e.EmployeeID = p.PersonID
    WHERE e.email = ? AND e.Password = ?
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