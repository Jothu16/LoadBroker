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

export default AvailableLoads;
