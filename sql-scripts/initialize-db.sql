USE fexpediadb;

-- Person Table
CREATE TABLE Person (
    PersonID INT AUTO_INCREMENT PRIMARY KEY,
    LastName VARCHAR(255),
    FirstName VARCHAR(255),
    Address VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    Zip VARCHAR(20),
    Telephone VARCHAR(20)
);

-- Employee Table (inherits from Person)
CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    SSN VARCHAR(20),
    HourlyRate DECIMAL(10, 2),
    StartDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Person(PersonID)
);

-- Customer Table (inherits from Person)
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    Email VARCHAR(255),
    Preferences TEXT,
    Rating INT,
    CreditCard VARCHAR(20),
    FOREIGN KEY (CustomerID) REFERENCES Person(PersonID)
);

-- Account Table
CREATE TABLE Account (
    AccountNum INT AUTO_INCREMENT PRIMARY KEY,
    CreationDate DATE,
    BookingFee DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- Reservation Table
CREATE TABLE Reservation (
    ReservationNumber INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE,
    Passengers INT,
    TotalFare DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- Airline Table
CREATE TABLE Airline (
    AirlineID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Text TEXT
);

-- FlightData Table
CREATE TABLE FlightData (
    FlightNumber INT PRIMARY KEY,
    NumSeats INT,
    DaysOfWeek VARCHAR(50),
    AirlineID INT,
    FOREIGN KEY (AirlineID) REFERENCES Airline(AirlineID)
);

-- Airport Table
CREATE TABLE Airport (
    AirportID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    City VARCHAR(100),
    Country VARCHAR(100)
);

-- Fare Table
CREATE TABLE Fare (
    FareID INT AUTO_INCREMENT PRIMARY KEY,
    BaseFare DECIMAL(10, 2),
    HiddenFare DECIMAL(10, 2),
    LengthOfStay INT
);

-- Leg Table
CREATE TABLE Leg (
    LegID INT AUTO_INCREMENT PRIMARY KEY,
    specialMeal VARCHAR(255),
    seatNumber INT,
    class VARCHAR(50),
    ReservationNumber INT,
    FlightNumber INT,
    FOREIGN KEY (ReservationNumber) REFERENCES Reservation(ReservationNumber),
    FOREIGN KEY (FlightNumber) REFERENCES FlightData(FlightNumber)
);

-- Fly Table (to and from Airports)
CREATE TABLE Fly (
    FlyID INT AUTO_INCREMENT PRIMARY KEY,
    toAirportID INT,
    fromAirportID INT,
    departureTime DATETIME,
    arrivalTime DATETIME,
    FOREIGN KEY (toAirportID) REFERENCES Airport(AirportID),
    FOREIGN KEY (fromAirportID) REFERENCES Airport(AirportID)
);

-- Advance Purchase Table
CREATE TABLE AdvancePurchase (
    PurchaseID INT AUTO_INCREMENT PRIMARY KEY,
    FareID INT,
    FOREIGN KEY (FareID) REFERENCES Fare(FareID)
);