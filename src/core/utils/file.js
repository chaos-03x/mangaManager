/**
 * 异步文件和目录操作工具。
 */

const fs = require('fs/promises');
const path = require('path');

class FileUtils {
    /**
     * 扫描指定目录下的所有子目录名称。
     * @param {string} directoryPath - 要扫描的目录路径。
     * @returns {Promise<string[]>} - 一个包含所有子目录名称的数组。如果出错则返回空数组。
     */


    /**
     * 统计指定目录下符合特定扩展名的文件数量。
     * @param {string} directoryPath - 要扫描的目录路径。
     * @param {string[]} extensions - 一个包含文件扩展名（带点，如 '.webp'）的数组。
     * @returns {Promise<number>} - 符合条件的文件数量。如果出错则返回 0。
     */


    /**
     * 检查路径是否存在且是否为目录。
     * @param {string} itemPath - 路径。
     * @returns {Promise<boolean>} - 如果是目录则返回 true，否则返回 false。
     */


    /**
     * 检查路径是否存在且是否为文件。
     * @param {string} itemPath - 路径。
     * @returns {Promise<boolean>} - 如果是文件则返回 true，否则返回 false。
     */

}

module.exports = FileUtils;