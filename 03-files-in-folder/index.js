const fs = require('fs');
const path = require('path');

const list = () => {
    const folder = path.join(__dirname, 'secret-folder');

    if (!fs.existsSync(folder)) throw ('Folder not found');

    fs.readdir(folder, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                console.log(file);
            })
        }
    })

};

list();