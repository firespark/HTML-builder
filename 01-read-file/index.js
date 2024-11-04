const fs = require('fs');
const path = require('path');

function read() {
    const filePath = path.join(__dirname, 'text.txt');

    const stream = fs.createReadStream(filePath);

    stream.on('data', (chunk) => {
        process.stdout.write(`${chunk}\n`);
    });

    stream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
    });
}

read();