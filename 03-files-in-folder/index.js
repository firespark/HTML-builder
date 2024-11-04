const fs = require('fs');
const path = require('path');

function formatFileSize(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizeInUnit = bytes / Math.pow(1024, i);
    return `${sizeInUnit.toFixed(2)} ${sizes[i]}`;
}


const list = () => {
    const folder = path.join(__dirname, 'secret-folder');


    fs.readdir(folder, { withFileTypes: true }, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                if (file.isFile()) {
                    let extension = path.extname(file.name);
                    let size = formatFileSize(fs.statSync(path.join(folder, file.name)).size);
                    console.log(`${path.basename(file.name, extension)} - ${extension.replace('.','')} - ${size}`);
                }
            })
        }
    })

};

list();