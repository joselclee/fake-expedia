// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { useUser } from '../context/UserContext';

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserInfo();
      fetchUserFlights();
    }
  }, [user]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/customers/${user.CustomerID}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchUserFlights = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/customers/${user.CustomerID}/reservations`);
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching user flights:', error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Card>
              <Card.Body>
                <h2>User Profile</h2>
                {userInfo ? (
                  <div>
                    <p>Welcome, {userInfo.FirstName} {userInfo.LastName}!</p>
                    <p>Email: {userInfo.Email}</p>
                    <p>Address: {userInfo.Address}, {userInfo.City}, {userInfo.State}, {userInfo.Zip}</p>
                    <p>Telephone: {userInfo.Telephone}</p>
                    <p>Preferences: {userInfo.Preferences}</p>
                    <p>Rating: {userInfo.Rating}</p>
                    <Button variant="primary" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <p>Loading user information...</p>
                )}
                <h3 className="mt-4">Current Flights</h3>
                {flights.length > 0 ? (
                  <ul>
                    {flights.map((flight) => (
                      <li key={flight.ReservationNumber}>
                        Flight {flight.FlightNumber} on {flight.Date} - {flight.Passengers} passengers, Total Fare: ${flight.TotalFare}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No flights booked.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;