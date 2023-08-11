import React from 'react';
// ... other imports

function LoadDisplay({ load, truck }) {
    const profit = calculateProfit(load, truck); // Assuming you've imported the calculateProfit function

    const getProfitClass = (profitValue) => {
        if (profitValue > 1000) return 'green';
        if (profitValue > 500) return 'yellow';
        return 'red';
    };

    const profitClass = getProfitClass(profit);

    return (
        <div>
            {/* ... other load details */}
            
            <span className={profitClass}>Profit: ${profit}</span>
            
            {/* ... other load details */}
        </div>
    );
}

export default LoadDisplay;
