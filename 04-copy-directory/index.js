const fs = require('fs/promises');
const path = require('path');

const copy = async () => {
    const folder = path.join(__dirname, 'files');
    const folderCopy = path.join(__dirname, 'files-copy');

    try {
        await fs.mkdir(folderCopy, { recursive: true });
    } catch (err) {
        console.error("Error creating folder:", err);
    }

    try {
        const existingFiles = await fs.readdir(folderCopy, { withFileTypes: true });
        for (const file of existingFiles) {
            const filePath = path.join(folderCopy, file.name);
            await fs.unlink(filePath);
        }

        const files = await fs.readdir(folder, { withFileTypes: true });
        for (const file of files) {
            if (file.isFile()) {
                const sourceFilePath = path.join(folder, file.name);
                const destinationFilePath = path.join(folderCopy, file.name);
                await fs.copyFile(sourceFilePath, destinationFilePath);
            }
        }

        console.log("Files copied successfully!");
    } catch (err) {
        console.error("Error during file operations:", err);
    }
};

copy();
