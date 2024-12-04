import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Header from './Header';

const AccountCreation = () => {
  const { setUser } = useUser();
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState('');
  const [rating, setRating] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [telephone, setTelephone] = useState('');
  let navigate = useNavigate();

  const handleAccountCreation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/customers', {
        LastName: lastName,
        FirstName: firstName,
        Email: email,
        Preferences: preferences,
        Rating: rating,
        CreditCard: creditCard,
        Address: address,
        City: city,
        State: state,
        Zip: zip,
        Telephone: telephone,
      });
      setUser(response.data);
      navigate('/user-profile');
    } catch (error) {
      console.error('Error creating account:', error);
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
                <h2>Create Account</h2>
                <Form onSubmit={handleAccountCreation}>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formPreferences">
                        <Form.Label>Preferences</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Preferences"
                          value={preferences}
                          onChange={(e) => setPreferences(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formRating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formCreditCard">
                        <Form.Label>Credit Card</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Credit Card"
                          value={creditCard}
                          onChange={(e) => setCreditCard(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Zip"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formTelephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Telephone"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit">
                    Create Account
                  </Button>
                </Form>
                <p className="mt-3">
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountCreation;