import React from 'react';

const MainContent = ({ loads, newLoad, handleInputChange, handleSubmit, distributionCenters, ports }) => {
    return (
        <main>
            <h2>Available Loads</h2>
            {loads.map(load => (
                <div key={load.id}>
                    <h4>{load.name}</h4>
                    <p>{load.description}</p>
                </div>
            ))}
            <div className="add-load-section">
                <h3>Add New Load</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="loadId" placeholder="Load ID" value={newLoad.loadId} onChange={handleInputChange} required />
                    <select name="distributionCenter" value={newLoad.distributionCenter} onChange={handleInputChange} required>
                        <option value="">--Select a Distribution Center--</option>
                        {distributionCenters.map(dc => (
                            <option key={dc._id} value={dc._id}>
                                {dc.name}
                            </option>
                        ))}
                    </select>
                    <select name="port" value={newLoad.port} onChange={handleInputChange} required>
                        <option value="">--Select a Port--</option>
                        {ports.map(port => (
                            <option key={port._id} value={port._id}>
                                {port.name}
                            </option>
                        ))}
                    </select>
                    <input type="number" name="weight" placeholder="Weight" value={newLoad.weight} onChange={handleInputChange} required />
                    <input type="number" name="price" placeholder="Price" value={newLoad.price} onChange={handleInputChange} required />
                    <button type="submit">Add Load</button>
                </form>
            </div>
        </main>
    );
}

export default MainContent;
