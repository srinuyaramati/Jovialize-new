const fs = require("fs");

function deleteFileFromSystem(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error removing file: ${err}`);
        }
        console.error(`File ${filePath} has been successfully removed.`);
    });
}

module.exports = {
    deleteFileFromSystem: deleteFileFromSystem
}