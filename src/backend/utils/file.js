/**
 * 文件和目录操作工具。
 */

const fs = require('fs/promises');
const path = require('path');

/**
 * 获取指定路径下的所有文件夹路径
 */
async function getDirs(dirPath) {
    const files = await fs.readdir(dirPath);
    const dirs = [];
}

/**
 * 判断指定路径是否为文件夹
 */
async function isDir(filePath) {
    const stat = await fs.stat(filePath);
    return stat.isDirectory();
}