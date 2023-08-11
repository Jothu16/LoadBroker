function estimateTripDuration(distance) {
    const averageSpeed = 60; // mph, considering breaks, traffic, etc.
    return distance / averageSpeed;
}

module.exports = estimateTripDuration;
