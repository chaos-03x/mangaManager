/**
 * fs path 仍不熟练
 */
const fs = require('fs/promises');
const path = require('path');

const DIR = "C:/Users/z.chaos/Downloads/Test"

async function isDir(filePath) {
    const stat = await fs.stat(filePath);
    console.log(stat);
    // stat.
    return stat.isDirectory();
}

console.log(isDir(DIR));