/**
 * 异步文件和目录操作工具。
 * 备注：优化方向 - 并发
 */

const { dir, count } = require('console');
const fs = require('fs/promises');
const path = require('path');

class FileUtils {
    /**
     * 扫描指定目录下的所有子目录名称。
     * @param {string} dirPath - 要扫描的目录路径。
     * @returns {Promise<string[]>} - 一个包含所有子目录名称的数组。如果出错则返回空数组。
     */
    static async scanSubDirectory(dirPath) {
        try {
            const entries = await fs.readdir(dirPath)
            const subDirectories = []
            for (const entry of entries) {
                const entryPath = path.join(dirPath, entry)
                const entryStat = await fs.stat(entryPath)
                if (entryStat.isDirectory()) {
                    subDirectories.push(entry)
                } else {
                    continue
                }
            }
            return subDirectories
        } catch (error) {
            console.warn(`FileUtiles: "scanSubDirectory()":${error.message}`);
            return []
        }
    }


    /**
     * 统计指定目录下符合特定扩展名的文件数量。
     * @param {string} dath - 要扫描的目录路径。
     * @param {string[]} extensions - 一个包含文件扩展名（带点，如 '.webp'）的数组。
     * @returns {Promise<number>} - 符合条件的文件数量。如果出错则返回 0。
     */
    static async countFilesByExtension(dirPath, extensions = ['.webp']) {
        try {
            const entries = fs.readdir(dirPath)
            let fileCount = 0
            for (const entry of entries) {
                const entryPath = path.join(dirPath, entry)
                const entryStat = await fs.stat(entryPath)
                if (entryStat.isFile()) {
                    const ext = path.extname(entryPath).toLowerCase()
                    if (extensions.includes(ext)) {
                        fileCount++
                    }
                }
            }
            return count
        } catch (error) {
            console.warn(`FileUtiles: "countFilesByExtension()":${error.message}`);
            return 0
        }
    }


    /**
     * 检查路径是否存在且是否为目录。
     * @param {string} itemPath - 路径。
     * @returns {Promise<boolean>} - 如果是目录则返回 true，否则返回 false。
     */
    static async isDirectory(itemPath) {
        try {
            const itemStat = await fs.stat(itemPath)
            return itemStat.isDirectory()
        } catch (error) {
            console.warn(`FileUtiles: "isDirectory()":${error.message}`);
            return false
        }
    }


    /**
     * 检查路径是否存在且是否为文件。
     * @param {string} itemPath - 路径。
     * @returns {Promise<boolean>} - 如果是文件则返回 true，否则返回 false。
     */
    static async isFile(itemPath) {
        try {
            const itemStat = await fs.stat(itemPath)
            return itemStat.file()
        } catch (error) {
            console.warn(`FileUtiles: "isDirectory()":${error.message}`);
            return false
        }
    }

}

module.exports = FileUtils;