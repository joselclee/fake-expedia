-- Insert into Person (for both customers and employees)
INSERT INTO Person (PersonID, LastName, FirstName, Address, City, State, Zip, Telephone)
VALUES
(1, 'Johnson', 'Emily', '789 Pine St', 'Chicago', 'IL', '60601', '555-9101'), -- Employee 1
(2, 'Williams', 'Michael', '321 Maple Ave', 'Boston', 'MA', '02108', '555-1212'), -- Employee 2
(3, 'Smith', 'John', '123 Elm St', 'New York', 'NY', '10001', '555-1234'), -- Customer 3
(4, 'Doe', 'Jane', '456 Oak St', 'Los Angeles', 'CA', '90001', '555-5678'); -- Customer 4

-- Insert into Employee
INSERT INTO Employee (EmployeeID, SSN, HourlyRate, StartDate)
VALUES
(1, '123-45-6789', 25.00, '2023-01-01'), -- Matches PersonID 1
(2, '987-65-4321', 30.00, '2022-06-15'); -- Matches PersonID 2

-- Insert into Customer
INSERT INTO Customer (CustomerID, Email, Preferences, Rating, CreditCard)
VALUES
(3, 'john.smith@example.com', 'Window seat', 5, '4111111111111111'), -- Matches PersonID 3
(4, 'jane.doe@example.com', 'Vegan meal', 4, '4222222222222222'); -- Matches PersonID 4

-- Insert into Account
INSERT INTO Account (CreationDate, BookingFee, CustomerID)
VALUES
('2023-05-01', 10.00, 3), -- CustomerID 3
('2023-06-10', 12.50, 4); -- CustomerID 4

-- Insert into Reservation
INSERT INTO Reservation (Date, Passengers, TotalFare, CustomerID)
VALUES
('2023-07-20', 1, 200.00, 3), -- CustomerID 3
('2023-08-15', 2, 400.00, 4); -- CustomerID 4

-- Insert into Airline
INSERT INTO Airline (AirlineID, Name, Text)
VALUES
(1, 'Airline A', 'Leading airline in the USA'),
(2, 'Airline B', 'Low-cost carrier with wide coverage');

-- Insert into FlightData
INSERT INTO FlightData (FlightNumber, NumSeats, DaysOfWeek, AirlineID)
VALUES
(1001, 180, 'Monday, Wednesday, Friday', 1), -- AirlineID 1
(1002, 200, 'Tuesday, Thursday', 2); -- AirlineID 2

-- Insert into Airport
INSERT INTO Airport (AirportID, Name, City, Country)
VALUES
(1, 'JFK International', 'New York', 'USA'),
(2, 'LAX International', 'Los Angeles', 'USA');

-- Insert into Fare
INSERT INTO Fare (FareID, BaseFare, HiddenFare, LengthOfStay)
VALUES
(1, 150.00, 50.00, 7),
(2, 200.00, 75.00, 10);

-- Insert into Leg
INSERT INTO Leg (LegID, specialMeal, seatNumber, class, ReservationNumber, FlightNumber)
VALUES
(1, 'Vegetarian', 12, 'Economy', 1, 1001), -- Reservation 1, Flight 1001
(2, 'Standard', 15, 'Business', 2, 1002); -- Reservation 2, Flight 1002

-- Insert into Fly
INSERT INTO Fly (FlyID, toAirportID, fromAirportID, departureTime, arrivalTime)
VALUES
(1, 1, 2, '2023-07-20 10:00:00', '2023-07-20 14:00:00'), -- JFK to LAX
(2, 2, 1, '2023-08-15 15:00:00', '2023-08-15 19:00:00'); -- LAX to JFK

-- Insert into AdvancePurchase
INSERT INTO AdvancePurchase (AdvancePurchaseID, FareID)
VALUES
(1, 1), -- FareID 1
(2, 2); -- FareID 2
