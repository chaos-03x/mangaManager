const FileUtils = require('../utils/FileUtils.js')
const { AuthorEntry, MangaSeries } = require('../models/MangaStructure.js')
const path = require('path')

class MangaScannerService {
    static MANGA_NAME_PATTERN = /^(.*) \((\d+)\)$/; // 匹配 "漫画标题 (ID)"
    static AUTHOR_PREFIX = '# '

    /**
     * 扫描漫画库
     * @param {string} libraryPath - 漫画库的根路径
     * @returns {Promise<AuthorEnrty[]>} - 一个包含作者条目的数组
     * @throws {Error} 如果库路径无效或扫描过程发生错误
     */
    static async scanLibrary(libraryPath) {
        if (!libraryPath || !(await FileUtils.isDirectory(libraryPath))) {
            console.error(`传入的路径无效:${libraryPath}`);
            throw new Error(`传入的路径无效:${libraryPath}`)
        }

        const authorFolderNames = await FileUtils.scanSubDirectory(libraryPath)
        const results = []

        for (const authorFolderName of authorFolderNames) {
            if (!authorFolderName.startsWith(this.AUTHOR_PREFIX)) {
                continue
            }

            const authorName = authorFolderName.substring(this.AUTHOR_PREFIX.length).trim()
            const authorEntry = new AuthorEntry(authorName)
            const authorFullPath = path.join(libraryPath, authorFolderName)

            const seriesFolederNames = await FileUtils(authorFullPath)
            for (seriesFolderName of seriesFolederNames) {
                const seriesPath = path.join(authorFullPath, seriesFolderName)
                if (!(await FileUtils.isDirectory(seriesPath))) {
                    continue
                }
                const series = await this.#processSeriesDirectory(seriesPath, seriesFolderName)
                if (series) {
                    authorEntry.addSeries(series)
                }
            }

            if (authorEntry.hasSerise()) {
                results.push(authorEntry)
            }
        }
        return results
    }

    /**
     * 处理单个漫画系列文件夹
     * @private
     * @param {string} seriesFullPath - 漫画系列文件夹的完整路径
     * @param {string} seriesFolderName - 漫画系列文件夹的名称
     * @returns {Promise<MangaSeries|null>} - MangaSeries 对象或 null
     */
    static async #processSeriesDirectory(seriesFullPath, seriesFolderName) {
        const match = seriesFolderName.match(this.MANGA_NAME_PATTERN)
        if (!match) {
            console.warn(`漫画系列文件夹名称不匹配，已跳过`);
            return null
        }

        const [, title, id] = match
        title = title.trim()
        id = id.trim()
        const imageCount = await FileUtils.countFilesByExtension(seriesFullPath,['.webp'])

        return new MangaSeries(title,id,seriesFullPath,imageCount)
    }
}

module.exports = MangaScannerService