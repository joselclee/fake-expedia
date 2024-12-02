// src/components/SearchResults.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from './Header';

const SearchResults = () => {
  return (
    <div>
        <Header />
        <Container>
        <Row className="justify-content-center mt-5">
            <Col md={8}>
            <Card>
                <Card.Body>
                <h2>Search Results</h2>
                {/* Add search results here */}
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    </div>
  );
};

export default SearchResults;