import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Main Dashboard Component
function Dashboard() {
    // State to hold the loads data
    const [loads, setLoads] = useState([]);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // Fetch loads data from the backend
        const fetchLoads = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loads');
                setLoads(response.data);
            } catch (error) {
                console.error("Error fetching loads:", error);
            }
        };

        fetchLoads();
    }, []);


    return (
        <div className="dashboard container-fluid">
            <Header />
            <div className="row">
                <Sidebar />
                <MainContent loads={loads} />
            </div>
        </div>
    );
}

// Header Component for the dashboard
function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">Your Logo</a>
            <div className="ml-auto">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </div>
        </nav>
    );
}

// Sidebar Component for navigation
function Sidebar() {
    return (
        <div className="col-md-3 bg-light">
            <ul className="nav flex-column mt-3">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Available Loads</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Active Shipments</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Payment Details</a>
                </li>
            </ul>
        </div>
    );
}

// Main Content Component
function MainContent({ loads }) {
    return (
        <div className="col-md-9 p-4">
            <h2>Dashboard Overview</h2>
            <AvailableLoads data={loads} />
        </div>
    );
}

// Component to display available loads
function AvailableLoads({ data }) {
    return (
        <div>
            <h3>Available Loads</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Price</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(load => (
                        <tr key={load._id}>
                            <td>{load._id}</td>
                            <td>{load.origin}</td>
                            <td>{load.destination}</td>
                            <td>${load.price}</td>
                            <td>{new Date(load.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <LoadDetails data={data} />
            <CarrierRatings data={data} />
            <BookingHistory data={data} />
            <PriceEstimator />
            <Notifications data={data} />
            <PaymentHistory data={data} />
            <SupportHelp />
        </div>
    );
}

// Component to display detailed information about each load
function LoadDetails({ data }) {
    return (
        <div>
            <h4>Load Details</h4>
            {/* ... code to display load details */}
        </div>
    );
}

// Component to display ratings for carriers
function CarrierRatings({ data }) {
    return (
        <div>
            <h4>Carrier Ratings</h4>
            {/* ... code to display carrier ratings */}
        </div>
    );
}

// Component to display booking history
function BookingHistory({ data }) {
    return (
        <div>
            <h4>Booking History</h4>
            {/* ... code to display booking history */}
        </div>
    );
}

// Component for estimating shipping prices
function PriceEstimator() {
    return (
        <div>
            <h4>Price Estimator</h4>
            {/* ... code for price estimation */}
        </div>
    );
}

// Component to display notifications
function Notifications({ data }) {
    return (
        <div>
            <h4>Notifications</h4>
            {/* ... code to display notifications */}
        </div>
    );
}

// Component to display payment history
function PaymentHistory({ data }) {
    return (
        <div>
            <h4>Payment History</h4>
            {/* ... code to display payment history */}
        </div>
    );
}

// Support and help section
function SupportHelp() {
    return (
        <div>
            <h4>Support & Help</h4>
            {/* ... code for support and help */}
        </div>
    );
}

export default Dashboard;
