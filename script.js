const fs = require('fs');
const path = require('path');

function createDirectoryIfNotExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function createFilesInFolder(folderPath, numberOfFiles) {
    for (let i = 1; i <= numberOfFiles; i++) {
        const filePath = path.join(folderPath, `file${i}.txt`);
        fs.writeFileSync(filePath, `Це вміст файлу ${filePath}`, 'utf8');
    }
}

function createFoldersWithFiles(baseFolderPath, numberOfFolders, numberOfFiles) {
    for (let i = 1; i <= numberOfFolders; i++) {
        const subFolderPath = path.join(baseFolderPath, `folder${i}`);
        createDirectoryIfNotExists(subFolderPath);
        createFilesInFolder(subFolderPath, numberOfFiles);
    }
}

function logPaths(dirPath) {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);
        const type = stats.isDirectory() ? 'папка' : 'файл';

        console.log(`${fullPath} - ${type}`);

        if (stats.isDirectory()) {
            logPaths(fullPath);
        }
    });
}

const baseFolderPath = path.join(__dirname, 'baseFolder');
createDirectoryIfNotExists(baseFolderPath);

createFoldersWithFiles(baseFolderPath, 5, 5);

logPaths(baseFolderPath);
