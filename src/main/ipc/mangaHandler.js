const { ipcMain } = require('electron')
const path = require('path')
const fs = require('fs/promises')

const libraryPath = "F:/Test"

async function scanMangas(libraryPath) {
    const finalResults = []
    const mangaNamePattern = /^(.*) \((\d+)\)$/

    try {
        const authorEntries = await fs.readdir(libraryPath)

        for (const authorEntryName of authorEntries) {
            const authorPath = path.join(libraryPath, authorEntryName)
            let authorStat

            try {
                authorStat = await fs.stat(authorPath)
            } catch (error) {
                console.warn(`无法读取条目 ${authorPath} 的信息: ${error.message}`);
                continue
            }

            const authorPrefix = '# '
            if (authorStat.isDirectory() && authorEntryName.startsWith(authorPrefix)) {
                let curAuthorName = authorEntryName.substring(authorPrefix.length).trim()   // 取得当前作者
                let mangasForThisAuthor = []    // 存储当前作者的所有漫画

                const mangaSeriesEntries = await fs.readdir(authorPath)
                for (const mangaSeriesName of mangaSeriesEntries) {
                    const mangaSeriesPath = path.join(authorPath, mangaSeriesName)
                    let mangaSeriesStat
                    try {
                        mangaSeriesStat = await fs.stat(mangaSeriesPath)
                    } catch (error) {
                        console.warn(`无法读取条目 ${mangaSeriesPath} 的信息: ${error.message}`);
                        continue
                    }

                    if (mangaSeriesStat.isDirectory()) {
                        const match = mangaSeriesName.match(mangaNamePattern)
                        if (match) {
                            const name = match[1].trim()
                            const ID = match[2].trim()
                            let imageCount = 0
                            const filesInMangaSeries = await fs.readdir(mangaSeriesPath)

                            for (const fileInSeries of filesInMangaSeries) {
                                const filePath = path.join(mangaSeriesPath, fileInSeries)
                                let fileStat
                                try {
                                    fileStat = await fs.stat(filePath)
                                } catch (error) {
                                    console.warn(`无法读取条目 ${filePath} 的信息: ${error.message}`);
                                    continue
                                }

                                if (fileStat.isFile() && path.extname(fileInSeries).toLowerCase() === 'webp') {
                                    imageCount++
                                }
                            }

                            mangasForThisAuthor.push({
                                name: name,
                                ID: ID,
                                num: imageCount,
                                path: mangaSeriesPath
                            })
                        } else {
                            console.warn(`漫画系列文件夹 "${mangaSeriesName}" 名称格式不匹配,已跳过`);
                        }
                    }
                }

                // 当前作者的所有漫画都处理完毕
                if(mangasForThisAuthor.length > 0){
                    finalResults.push({
                        author: curAuthorName,
                        mangas: mangasForThisAuthor
                    })
                }
            }
        }
        console.log(JSON.stringify(finalResults, null, 2));
        return finalResults
    } catch (error) {
        console.warn(`库目录扫描失败: ${error.message}`);
        return []
    }
}

scanMangas(libraryPath)