import React from 'react';

function Dropdown({ name, options }) {
    return (
        <select name={name}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

function LoadEntryForm() {
    const distributionCenters = ['DC1', 'DC2', 'DC3']; // Add more distribution centers as needed
    const ports = ['Port1', 'Port2', 'Port3']; // Add more ports as needed

    return (
        <form>
            {/* ... other fields */}
            
            <label>Distribution Center:</label>
            <Dropdown name="distributionCenter" options={distributionCenters} />
            
            <label>Port:</label>
            <Dropdown name="port" options={ports} />
            
            {/* ... other fields */}
            
            <input type="submit" value="Submit" />
        </form>
    );
}

export default LoadEntryForm;
