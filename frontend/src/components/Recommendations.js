import React from 'react';
// ... other imports

function Recommendations({ recommendations }) {
    if (!recommendations || recommendations.length === 0) {
        return <p>No recommendations available at the moment.</p>;
    }

    return (
        <div>
            <h3>Recommended Loads:</h3>
            {recommendations.map(load => (
                <LoadDisplay key={load.id} load={load} />
            ))}
        </div>
    );
}

export default Recommendations