import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Importing the CSS file

function Dashboard() {
    // State for storing truck and load data
    const [trucks, setTrucks] = useState([]);
    const [loads, setLoads] = useState([]);
    const [newLoad, setNewLoad] = useState({
        loadId: '',
        distributionCenter: '',
        port: '',
        weight: '',
        price: ''
    });
    const [truckInfo, setTruckInfo] = useState({
        model: '',
        year: ''
    });
    const [selectedTruck, setSelectedTruck] = useState(''); // State to store the selected truck

    const [newTruck, setNewTruck] = useState({
        model: '',
        year: '',
        tankCapacity: ''
    });

    const [userId, setUserId] = useState(null);

    // Fetch the current user's details when the component mounts
    useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/me');
            setUserId(response.data._id); // Assuming the response contains an _id field for the user
        } catch (err) {
            console.error("Error fetching current user:", err);
        }
    };


        fetchCurrentUser();
        fetchData();
        fetchTrucks();
    }, []);

    // Fetch loads data
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/loads');
            console.log("Fetched Loads:", response.data);  // Debugging log
            setLoads(response.data);
        } catch (err) {
            console.error("Error fetching loads:", err);
        }
    };

    // Fetch truck data from the database
    const fetchTrucks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/trucks');
            console.log("Fetched Trucks:", response.data);
            if (!Array.isArray(response.data)) {
                console.error("Trucks data is not an array:", response.data);
                return;
            }
            setTrucks(response.data);
        } catch (err) {
            console.error("Error fetching trucks:", err);
        }
    };

    // Handle input changes for new loads
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLoad(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission for new loads
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/loads', newLoad);
            fetchData();  // Refresh the loads after adding a new one
        } catch (err) {
            console.error("Error adding new load:", err);
        }
    };

    // Handle input changes for truck info
    const handleTruckInputChange = (e) => {
        const { name, value } = e.target;
        setTruckInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission for truck info
    const handleTruckSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/trucks', truckInfo);
            fetchTrucks();  // Refresh the trucks after adding a new one
        } catch (err) {
            console.error("Error adding new truck:", err.response ? err.response.data : err.message);
        }
    };

    const handleTruckSelection = async (e) => {
        setSelectedTruck(e.target.value);
        const selectedTruckData = trucks.find(truck => truck._id === e.target.value);
        
        try {
            const response = await axios.post('http://localhost:5000/api/calculate-profit', {
                load: newLoad,  // Assuming you want to calculate profit for the new load
                truck: selectedTruckData
            });
            const updatedLoads = loads.map(load => {
                load.profit = response.data.profit;
                return load;
            });
            setLoads(updatedLoads);
        } catch (error) {
            console.error("Error calculating profit:", error);
        }
    };

   // Updated function to save the selected truck for the user
    const saveSelectedTruck = async () => {
        try {
            console.log("Attempting to save selected truck..."); // Debugging log

            // Updated API endpoint to save the selected truck for the user
            const response = await axios.put(`http://localhost:5000/api/userTrucks/${selectedTruck}`, {
                userId: userId  // Send the user ID in the request body
            });
            
            console.log("Response from server:", response.data); // Debugging log

            // Display a prompt when the truck is saved successfully
            alert('Truck selected and saved successfully!');
        } catch (err) {
            console.error("Error selecting and saving truck:", err);
            alert('There was an error saving your truck selection. Please try again later.');
        }
    };

    const handleTruckChange = (e) => {
        const { name, value } = e.target;
        setNewTruck(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddTruck = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/trucks', newTruck);
            fetchTrucks();  // Refresh the trucks after adding a new one
        } catch (err) {
            console.error("Error adding new truck:", err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="dashboard container-fluid">
            <Header />
            <div className="row">
                <Sidebar />
                <MainContent loads={loads} />
            </div>
            <div className="add-truck-section">
                <h3>Add New Truck</h3>
                <form onSubmit={handleAddTruck}>
                    <input type="text" name="model" placeholder="Truck Model" value={newTruck.model} onChange={handleTruckChange} required />
                    <input type="number" name="year" placeholder="Year" value={newTruck.year} onChange={handleTruckChange} required />
                    <input type="number" name="tankCapacity" placeholder="Tank Capacity" value={newTruck.tankCapacity} onChange={handleTruckChange} required />
                    <button type="submit">Add Truck</button>
                </form>
            </div>
            {/* Dropdown for selecting a truck */}
            <div className="truck-selection">
                <label>Select a Truck: </label>
                <select value={selectedTruck} onChange={handleTruckSelection}>
                    <option value="">--Select a Truck--</option>
                    {trucks.map(truck => (
                        <option key={truck._id} value={truck._id}>
                            {truck.model} - {truck.year}
                        </option>
                    ))}
                </select>
            <button onClick={saveSelectedTruck}>Save Selected Truck</button>
            </div>
            {/* Form for adding a new load */}
            <div className="add-load-section">
                <h3>Add New Load</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="loadId" placeholder="Load ID" value={newLoad.loadId} onChange={handleInputChange} required />
                    <input type="text" name="distributionCenter" placeholder="Distribution Center" value={newLoad.distributionCenter} onChange={handleInputChange} required />
                    <input type="text" name="port" placeholder="Port" value={newLoad.port} onChange={handleInputChange} required />
                    <input type="number" name="weight" placeholder="Weight" value={newLoad.weight} onChange={handleInputChange} required />
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
                        <th>Price</th>
                        <th>Date</th>
                        <th>Profit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(load => (
                        <tr key={load._id}>
                            <td>{load.origin}</td>
                            <td>{load.destination}</td>
                            <td>{load.weight}</td>
                            <td>${load.price}</td>
                            <td>{load.date}</td>
                            <td>${typeof load.profit === 'number' ? load.profit.toFixed(2) : ''}</td>
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
