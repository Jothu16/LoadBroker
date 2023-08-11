import { DataFrame } from 'pandas-js';

function preprocessData(data) {
    // Convert the data to a DataFrame
    const df = new DataFrame(data);

    // Handle missing values, normalize data, etc.
    // Drop missing values
    const cleanedData = df.dropna();

    // Normalize the 'loadWeight' column
    const normalizedData = cleanedData.assign({
        loadWeight: row => row['loadWeight'] / 1000
    });

    return normalizedData;
}

export default preprocessData;
