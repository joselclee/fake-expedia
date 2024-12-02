// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <h2>Search for Flights, <s>Hotels, and Car Rentals</s></h2>
                <Form>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formFrom">
                        <Form.Label>From</Form.Label>
                        <Form.Control type="text" placeholder="City or Airport" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formTo">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="text" placeholder="City or Airport" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formDepartureDate">
                        <Form.Label>Departure Date</Form.Label>
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formReturnDate">
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formGuests">
                        <Form.Label>Guests</Form.Label>
                        <Form.Control type="text" placeholder="Number of Guests" />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-end">
                      <Button variant="primary" type="submit">Search</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;