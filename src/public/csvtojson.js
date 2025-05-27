const fs = require('fs');
const csv = require('csv-parser');

function convertCSVToJson(csvFilePath, jsonFilePath) {
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            fs.writeFile(jsonFilePath, JSON.stringify(results, null, 2), (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('CSV file successfully converted to JSON:', jsonFilePath);
                }
            });
        });
}

// Example usage:
const csvFilePath = 'cities.csv';
const jsonFilePath = 'output.json';
convertCSVToJson(csvFilePath, jsonFilePath);