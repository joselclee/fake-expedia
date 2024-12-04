const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db/connection');
const customerRoutes = require('./routes/customers');
const reservationRoutes = require('./routes/reservations');
const flightRoutes = require('./routes/flights');
const employeeRoutes = require('./routes/employees'); // Import the employees routes
const errorHandler = require('./middleware/errorHandler');

const app = express(); // Define the app variable using express()
app.use(cors());
app.use(express.json());

// Use routes
app.use('/customers', customerRoutes);
app.use('/reservations', reservationRoutes);
app.use('/flights', flightRoutes);
app.use('/employees', employeeRoutes); // Use the employees routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Fexpedia API');
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});