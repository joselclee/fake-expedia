import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { useUser } from '../context/UserContext';

const AccountLogin = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = isEmployee ? 'employees' : 'customers';
    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}/login`, {
        email,
        password,
      });
      setUser(response.data);
      navigate('/profile');
    } catch (error) {
      console.error('Error logging in:', error);
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
                <h2>Login</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formIsEmployee" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Login as Employee"
                      checked={isEmployee}
                      onChange={(e) => setIsEmployee(e.target.checked)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
                <p className="mt-3">
                  Don't have an account? <a href="/register">Create one</a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountLogin;