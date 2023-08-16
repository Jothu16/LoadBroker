import React from 'react';

const Sidebar = ({ trucks, handleTruckSelection, saveSelectedTruck }) => {
    return (
        <aside>
            <h2>Available Trucks</h2>
            <select onChange={handleTruckSelection}>
                <option value="">--Select a Truck--</option>
                {trucks.map(truck => (
                    <option key={truck._id} value={truck._id}>
                        {truck.model} - {truck.year}
                    </option>
                ))}
            </select>
            <button onClick={saveSelectedTruck}>Save Selected Truck</button>
        </aside>
    );
}

export default Sidebar;
