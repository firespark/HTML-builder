const fs = require('fs');
const path = require('path');

process.on('exit', () => {
    console.log('Farewell!');
});

process.on('SIGINT', () => {
    process.exit();
});

const write = () => {
    const filePath = path.join(__dirname, 'text.txt');

    const stream = fs.createWriteStream(filePath);

    process.stdin.on('data', (chunk) => {
        const input = chunk.toString().trim();
        if (input.toLowerCase() === 'exit') {
            process.exit();
        } else {
            stream.write(chunk);
        }
    });
};

console.log('Welcome! Write your text here:');
write();

