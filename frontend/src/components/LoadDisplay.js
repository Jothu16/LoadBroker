// ... other imports

function LoadDisplay({ load, truck }) {
    const profit = calculateProfit(load, truck); // Assuming you've imported the calculateProfit function

    let profitClass;
    if (profit > 1000) { // Example threshold
        profitClass = 'green';
    } else if (profit > 500) { // Example threshold
        profitClass = 'yellow';
    } else {
        profitClass = 'red';
    }

    return (
        <div>
            {/* ... other load details */}
            
            <span className={profitClass}>Profit: ${profit}</span>
            
            {/* ... other load details */}
        </div>
    );
}

export default LoadDisplay;
