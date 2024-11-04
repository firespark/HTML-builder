const fs = require('fs/promises');
const path = require('path');


const stylesFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const bundleFile = path.join(outputFolder, 'bundle.css');


const getCSSFiles = async () => {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    return files.filter(file => file.isFile() && path.extname(file.name) === '.css');
};


const readCSSFiles = async (files) => {
    const styles = [];
    for (const file of files) {
        const filePath = path.join(stylesFolder, file.name);
        const content = await fs.readFile(filePath, 'utf-8');
        styles.push(content);
    }
    return styles.join('\n');
};


const writeBundle = async (content) => {
    await fs.mkdir(outputFolder, { recursive: true });
    await fs.writeFile(bundleFile, content, 'utf-8');
};


const createBundle = async () => {
    try {
        const cssFiles = await getCSSFiles();
        const bundleContent = await readCSSFiles(cssFiles);
        await writeBundle(bundleContent);
        console.log('bundle.css created.');
    } catch (err) {
        console.error(err);
    }
};

createBundle();
