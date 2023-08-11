import * as tf from '@tensorflow/tfjs-node';

/**
 * Trains a TensorFlow.js model for predicting fuel consumption.
 * @param {Object} data - The training data.
 * @param {Object} config - Optional configuration for training.
 * @returns {Promise<tf.Sequential>} - The trained model.
 */
async function trainFuelConsumptionModel(data, config = { epochs: 100 }) {
    // Define the model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [data.inputShape], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1 }));

    // Compile the model
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    // Train the model
    await model.fit(data.inputs, data.labels, { epochs: config.epochs });

    return model;
}

export default trainFuelConsumptionModel;