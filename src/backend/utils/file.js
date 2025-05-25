/**
 * 异步文件和目录操作工具。
 */

const fs = require('fs/promises');
const path = require('path');

/**
 * 读取目录下的文件和子目录列表
 * @param {string} dirPath - 目录路径
 * @returns {Promise<string[]>} - 文件和子目录名称列表
 */
async function readDirectory(dirPath) {
    return fs.readdir(dirPath);
}

/**
 * @param {String} itemPath - 文件路径
 * @returns {Promise<boolean>} - 是否为文件夹
 */
async function isDir(itemPath) {
    const stat = await fs.stat(itemPath);
    return stat.isDirectory();
}

/**
 * @param {String} itemPath - 文件路径
 * @returns {Promise<boolean>} - 是否为文件
 */
async function isFile(itemPath) {
    const stat = await fs.stat(itemPath);
    return stat.isFile();
}

/**
 * 获取指定目录下的所有子目录
 * @param {String} dirPath - 目录路径
 * @returns {Promise<string[]>} - 子目录列表
 */
async function getDirs(dirPath) {
    const files = await readDirectory(dirPath);
    const dirs = [];
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        if (await isDir(filePath)) {
            dirs.push(filePath);
        }
    }
    return dirs;
}

module.exports = {
    readDirectory,
    isDir,
    isFile,
    getDirs
};