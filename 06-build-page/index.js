const fs = require('fs/promises');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');

fs.mkdir(projectDist, { recursive: true });

async function buildHTML() {
    let template = await fs.readFile(templatePath, 'utf-8');
    const matches = template.match(/{{\s*[\w-]+\s*}}/g) || [];

    for (const tag of matches) {
        const componentName = tag.replace(/[{}]/g, '').trim();
        const componentPath = path.join(componentsFolder, `${componentName}.html`);

        try {
            const componentContent = await fs.readFile(componentPath, 'utf-8');
            template = template.replace(tag, componentContent);
        } catch (err) {
            console.error(`Component ${componentName} not found:`, err);
        }
    }

    await fs.writeFile(path.join(projectDist, 'index.html'), template);
}

async function buildStyles() {
    const files = await fs.readdir(stylesFolder, { withFileTypes: true });
    const styles = await Promise.all(
        files
            .filter(file => file.isFile() && path.extname(file.name) === '.css')
            .map(file => fs.readFile(path.join(stylesFolder, file.name), 'utf-8'))
    );

    await fs.writeFile(path.join(projectDist, 'style.css'), styles.join('\n'));
}

async function copyAssets(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const items = await fs.readdir(src, { withFileTypes: true });

    for (const item of items) {
        const srcPath = path.join(src, item.name);
        const destPath = path.join(dest, item.name);

        if (item.isDirectory()) {
            await copyAssets(srcPath, destPath);
        } else if (item.isFile()) {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

async function buildPage() {
    try {
        await fs.mkdir(projectDist, { recursive: true });
        await buildHTML();
        await buildStyles();
        await copyAssets(assetsFolder, path.join(projectDist, 'assets'));
        console.log('Page created');
    } catch (err) {
        console.error(err);
    }
}

buildPage();
