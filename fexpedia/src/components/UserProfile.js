// src/components/UserProfile.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './Header';

const UserProfile = () => {
  return (
    <div>
        <Header />
            <Container>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                <Card>
                    <Card.Body>
                    <h2>User Profile</h2>
                    {/* Add user profile details here */}
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
    </div>
  );
};

export default UserProfile;