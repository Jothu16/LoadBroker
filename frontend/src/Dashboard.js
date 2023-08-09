import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Importing the CSS file


//mock data
const truckData = {
    "Volvo FH16": {
        year: 2020,
        tankCapacity: 600 // in liters
    },
    "Freightliner Cascadia": {
        year: 2019,
        tankCapacity: 550 // in liters
    }
    // ... add more truck models and years as needed
};
//mock data

function Dashboard() {
    const [loads, setLoads] = useState([]);
    const [newLoad, setNewLoad] = useState({
        loadId: '',
        distributionCenter: '',  // Changed from origin
        port: '',  // Changed from destination
        weight: '',
        price: ''
    });
        const [truckInfo, setTruckInfo] = useState({
        model: '',
        year: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/loads');
            setLoads(response.data);
        } catch (err) {
            console.error("Error fetching loads:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLoad(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/loads', newLoad);
            fetchData();  // Refresh the loads after adding a new one
        } catch (err) {
            console.error("Error adding new load:", err);
        }
    };

        const handleTruckInputChange = (e) => {
        const { name, value } = e.target;
        setTruckInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTruckSubmit = (e) => {
        e.preventDefault();
        // Here, you can send the truckInfo to the backend or save it in local storage
        console.log(truckInfo);
    };


    return (
        <div className="dashboard container-fluid">
            <Header />
            <div className="row">
                <Sidebar />
                <MainContent loads={loads} />
            </div>
            <div className="truck-info-section">
                <h3>Enter Your Truck Information</h3>
                <form onSubmit={handleTruckSubmit}>
                    <select name="model" value={truckInfo.model} onChange={handleTruckInputChange} required>
                        <option value="">Select Truck Model</option>
                        {Object.keys(truckData).map(model => (
                            <option key={model} value={model}>{model} ({truckData[model].year})</option>
                        ))}
                    </select>
                    <button type="submit">Save Truck Info</button>
                </form>
            </div>
            <div className="add-load-section">
                <h3>Add New Load</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="loadId" placeholder="Load ID" value={newLoad.loadId} onChange={handleInputChange} required />
                    
                    {/* Dropdown for Distribution Center */}
                    <select name="distributionCenter" value={newLoad.distributionCenter} onChange={handleInputChange} required>
                        <option value="">Select Distribution Center</option>
                        {/* Add your distribution centers here */}
                        <option value="Distribution Center 1">Distribution Center 1</option>
                        <option value="Distribution Center 2">Distribution Center 2</option>
                        {/* ... */}
                    </select>
                    
                    {/* Dropdown for Port */}
                    <select name="port" value={newLoad.port} onChange={handleInputChange} required>
                        <option value="">Select Port</option>
                        {/* Add your ports here */}
                        <option value="Port 1">Port 1</option>
                        <option value="Port 2">Port 2</option>
                        {/* ... */}
                    </select>
                    
                    <input type="text" name="weight" placeholder="Weight" value={newLoad.weight} onChange={handleInputChange} required />
                    <input type="number" name="price" placeholder="Price" value={newLoad.price} onChange={handleInputChange} required />
                    <button type="submit">Add Load</button>
                </form>
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
// Component to display available loads
function AvailableLoads({ data }) {
    // Function to handle the edit operation
    const handleEdit = async (load) => {
        // Here, you can open a modal or form to edit the load details
        // After editing, make an API call to the PUT route to update the load
        // axios.put(`/api/loads/${load._id}`, updatedLoadData);
    };

    // Function to handle the delete operation
    const handleDelete = async (loadId) => {
        try {
            await axios.delete(`/api/loads/${loadId}`);
            // After deleting, you can refresh the loads or remove the load from the state
        } catch (error) {
            console.error("Error deleting load:", error);
        }
    };

    return (
        <div>
            <h3>Available Loads</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Weight</th>
                        <th>Price</th> {/* Ensure this header is present */}
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(load => (
                        <tr key={load._id}>
                            <td>{load.origin}</td>
                            <td>{load.destination}</td>
                            <td>{load.weight}</td>
                            <td>${load.price}</td> {/* Ensure this line is present and correctly references the price */}
                            <td>{new Date(load.date).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEdit(load)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(load._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
