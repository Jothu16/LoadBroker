function LoadEntryForm() {
    return (
        <form>
            {/* ... other fields */}
            
            <label>Distribution Center:</label>
            <select name="distributionCenter">
                <option value="DC1">DC1</option>
                <option value="DC2">DC2</option>
                <option value="DC3">DC3</option>
                {/* Add more distribution centers as needed */}
            </select>
            
            <label>Port:</label>
            <select name="port">
                <option value="Port1">Port1</option>
                <option value="Port2">Port2</option>
                <option value="Port3">Port3</option>
                {/* Add more ports as needed */}
            </select>
            
            {/* ... other fields */}
            
            <input type="submit" value="Submit" />
        </form>
    );
}

export default LoadEntryForm;