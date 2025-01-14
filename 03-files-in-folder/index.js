const fs = require('fs').promises;
const path = require('path');

function formatFileSize(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizeInUnit = bytes / Math.pow(1024, i);
    return `${sizeInUnit.toFixed(2)} ${sizes[i]}`;
}


const list = async () => {
    const folder = path.join(__dirname, 'secret-folder');

    try {
        const files = await fs.readdir(folder, { withFileTypes: true });
        
        for (const file of files) {
            if (file.isFile()) {
                const extension = path.extname(file.name);
                const stats = await fs.stat(path.join(folder, file.name));
                const size = formatFileSize(stats.size);
                console.log(`${path.basename(file.name, extension)} - ${extension.replace('.', '')} - ${size}`);
            }
        }
    } catch (err) {
        console.error(err);
    }
};

list();