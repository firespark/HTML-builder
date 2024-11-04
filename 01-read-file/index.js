import { createReadStream } from 'node:fs';

const read = async () => {
    const folderPath = import.meta.dirname;
    const filePath = `${folderPath}/text.txt`;

    const stream = await createReadStream(filePath);

    stream.on('data', (chunk) => {
        process.stdout.write(`${chunk}\n`);
    });

    stream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
    });
};

await read();