const fuelPrices = {
    diesel: 3.00, // Example price per gallon, update as needed
};

function calculateProfit(load, truck) {
    // Log the input load and truck data
    console.log("Input Load Data:", load);
    console.log("Input Truck Data:", truck);

    const distance = getDistance(load.distributionCenter, load.port); // Assuming a function to get distance
    
    // Log the calculated distance
    console.log("Calculated Distance:", distance);

    const fuelConsumption = distance / truck.mpg; // Assuming truck has an mpg field
    
    // Log the estimated fuel consumption
    console.log("Estimated Fuel Consumption:", fuelConsumption);

    const refuels = Math.ceil(fuelConsumption / truck.tankCapacity); // Assuming truck has a tankCapacity field
    
    // Log the calculated number of refuels
    console.log("Number of Refuels:", refuels);

    const fuelCost = refuels * fuelPrices.diesel * truck.tankCapacity;
    
    // Log the estimated fuel cost
    console.log("Estimated Fuel Cost:", fuelCost);

    const profit = load.price - fuelCost;

    // Log the calculated profit
    console.log("Calculated Profit:", profit);

    return profit;
}

export default calculateProfit;
