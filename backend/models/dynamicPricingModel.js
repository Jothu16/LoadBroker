import { spawn } from 'child_process';

// Path to the Python script. Consider moving this to an environment variable or config file.
const PYTHON_SCRIPT_PATH = 'path/to/your/python/script.py';

/**
 * Calls a Python script to perform dynamic pricing highlighting using clustering or classification.
 * @param {Object} data - The data to be passed to the Python script.
 * @returns {Promise<Object>} - The result from the Python script.
 */
function dynamicPricingHighlight(data) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', [PYTHON_SCRIPT_PATH, JSON.stringify(data)]);

        pythonProcess.stdout.on('data', (data) => {
            try {
                resolve(JSON.parse(data.toString()));
            } catch (error) {
                reject(new Error("Error parsing Python script output: " + error.message));
            }
        });

        pythonProcess.stderr.on('data', (err) => {
            reject(new Error("Python script error: " + err.toString()));
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            }
        });
    });
}

export default dynamicPricingHighlight;