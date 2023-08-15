import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TruckDataManagement.css';

function TruckDataManagement() {
    const [truckData, setTruckData] = useState([]);
    const [newTruckData, setNewTruckData] = useState({
        model: '',
        year: '',
        averageTankData: ''
    });

    useEffect(() => {
        fetchTruckData();
    }, []);

    const fetchTruckData = async () => {
        try {
            const response = await axios.get('/api/truckdata');
            setTruckData(response.data);
        } catch (err) {
            console.error("Error fetching truck data:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTruckData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/truckdata/add', newTruckData);
            fetchTruckData();  // Refresh the truck data after adding a new one
        } catch (err) {
            console.error("Error adding new truck data:", err);
        }
    };

    const handleEdit = async (id, updatedData) => {
        try {
            await axios.put(`/api/truckdata/update/${id}`, updatedData);
            fetchTruckData();  // Refresh the truck data after editing
        } catch (err) {
            console.error("Error editing truck data:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/truckdata/delete/${id}`);
            fetchTruckData();  // Refresh the truck data after deletion
        } catch (err) {
            console.error("Error deleting truck data:", err);
        }
    };

    return (
        <div className="truck-data-management">
            <h3>Manage Truck Data</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="model" placeholder="Truck Model" value={newTruckData.model} onChange={handleInputChange} required />
                <input type="number" name="year" placeholder="Year" value={newTruckData.year} onChange={handleInputChange} required />
                <input type="number" name="averageTankData" placeholder="Average Tank Data" value={newTruckData.averageTankData} onChange={handleInputChange} required />
                <button type="submit">Add Truck Data</button>
            </form>
            <div className="truck-data-list">
                {truckData.map(data => (
                    <div key={data._id}>
                        <p>Model: {data.model}</p>
                        <p>Year: {data.year}</p>
                        <p>Average Tank Data: {data.averageTankData}</p>
                        <button onClick={() => handleEdit(data._id, data)}>Edit</button> {/* You can expand on this to open an edit form */}
                        <button onClick={() => handleDelete(data._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TruckDataManagement;
