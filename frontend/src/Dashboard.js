import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from './components/Header'; // Adjust the path based on where the Header component is located.
import AvailableLoads from './components/AvailableLoads';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

function Dashboard() {
    const [newLoad, setNewLoad] = useState({});
    const [truckInfo, setTruckInfo] = useState({});
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [userId, setUserId] = useState(null); // You might need to fetch or derive this value.
    const [loads, setLoads] = useState([]);
    const [newTruck, setNewTruck] = useState({});
    const [trucks, setTrucks] = useState([]);
    const [distributionCenters, setDistributionCenters] = useState([]);
    const [ports, setPorts] = useState([]);
    const [profits, setProfits] = useState([]);



    useEffect(() => {
        fetchCurrentUser();
        fetchDistributionCenters();
        fetchPorts();
        fetchProfits();
        fetchTrucks();  // Add this line
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/api/currentUser');
            setCurrentUser(response.data);
        } catch (error) {
            console.error("Error fetching current user:", error.response ? error.response.data : error.message);
        }
    };

    const fetchDistributionCenters = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/api/distributionCenters');
            setDistributionCenters(response.data);
        } catch (error) {
            console.error("Error fetching distribution centers:", error.response ? error.response.data : error.message);
        }
    };

    const fetchPorts = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/api/ports');
            setPorts(response.data);
        } catch (error) {
            console.error("Error fetching ports:", error.response ? error.response.data : error.message);
        }
    };

    const fetchProfits = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/api/profits');
            setProfits(response.data);
        } catch (error) {
            console.error("Error fetching profits:", error.response ? error.response.data : error.message);
        }
    };

    const fetchTrucks = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/api/trucks');
            setTrucks(response.data);
        } catch (error) {
            console.error("Error fetching trucks:", error.response ? error.response.data : error.message);
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
        // ... [Any additional logic you might have for this function]
    };

    // Updated function to save the selected truck for the user
    const saveSelectedTruck = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/userTrucks/${selectedTruck}`, {
                userId: userId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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
                <Sidebar trucks={trucks} handleTruckSelection={handleTruckSelection} saveSelectedTruck={saveSelectedTruck} />
                <MainContent loads={loads} newLoad={newLoad} handleInputChange={handleInputChange} handleSubmit={handleSubmit} distributionCenters={distributionCenters} ports={ports} />
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
            {/* Profit Data Section */}
            <div className="profit-data-section">
                <h3>Profit Data</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profits.map(entry => (
                            <tr key={entry.id}>
                                <td>{entry.date}</td>
                                <td>${entry.profit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;
