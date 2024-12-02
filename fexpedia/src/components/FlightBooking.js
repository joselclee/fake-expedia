// src/components/FlightBooking.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Header from './Header';
import axios from 'axios';

const FlightBooking = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [guests, setGuests] = useState('');
  const [flights, setFlights] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('From:', from);
    console.log('To:', to);
    console.log('Departure Date:', departureDate);
    console.log('Return Date:', returnDate);
    console.log('Guests:', guests);

    try {
      const response = await axios.get('http://localhost:5000/flights');
      console.log('Response received:', response);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Card>
              <Card.Body>
                <h2>Book a Flight</h2>
                <Form onSubmit={handleSearch}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formFrom">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City or Airport"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formTo">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City or Airport"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formDepartureDate">
                        <Form.Label>Departure Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formReturnDate">
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formGuests">
                        <Form.Label>Guests</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Number of Guests"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end">
                      <Button variant="primary" type="submit">
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
                {flights.length > 0 && (
                  <div>
                    <h3>Available Flights</h3>
                    <ul>
                      {flights.map((flight) => (
                        <li key={flight.FlightNumber}>
                          Flight {flight.FlightNumber} - {flight.NumSeats} seats available
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FlightBooking;