const fuelPrices = {
    diesel: 3.00, // Example price per gallon, update as needed
};

function calculateProfit(load, truck) {
    const distance = getDistance(load.distributionCenter, load.port); // Assuming a function to get distance
    const fuelConsumption = distance / truck.mpg; // Assuming truck has an mpg field
    const refuels = Math.ceil(fuelConsumption / truck.tankCapacity); // Assuming truck has a tankCapacity field
    const fuelCost = refuels * fuelPrices.diesel * truck.tankCapacity;
    return load.price - fuelCost;
}

module.exports = calculateProfit;