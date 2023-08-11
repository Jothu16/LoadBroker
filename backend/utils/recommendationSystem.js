import calculateProfit from './profitCalculator.js';

function recommendLoads(user, loads) {
    // Implement a recommendation algorithm based on user preferences, past trips, etc.
    // Example: Recommend loads with the highest profit
    loads.sort((a, b) => calculateProfit(b, user.truck) - calculateProfit(a, user.truck));
    return loads.slice(0, 5); // Return top 5 recommended loads
}

export default recommendLoads;
