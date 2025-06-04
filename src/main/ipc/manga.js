const { ipcMain } = require('electron')
const path = require('path')
const fs = require('fs/promises')

const libraryPath = "F:/Test"
// const libraryPath = "C:/Users/z.chaos/Downloads/Test"

async function scanMangas(libraryPath) {
    const finalResults = []
    const mangaNamePattern = /^(.*) \((\d+)\)$/;

    try {
        const authorEntries = await fs.readdir(libraryPath) // 读取库根目录

        for (const authorEntryName of authorEntries) {
            const authorPath = path.join(libraryPath, authorEntryName)
            let authorStat
            try {
                authorStat = await fs.stat(authorPath)
            } catch (error) {
                console.warn(`无法读取条目${authorPath}的信息:${error.message}`);
                continue // 跳过无法读取的条目
            }

            // 检查是否是目录，并且以 # 开头
            const authorPrefix = "# ";
            if (authorStat.isDirectory() && authorEntryName.startsWith(authorPrefix)) {
                const curAuthorName = authorEntryName.substring(authorPrefix.length).trim()
                const mangasForThisAuthor = []  // 存储当前作者的所有漫画

                const mangaSeriesEntries = await fs.readdir(authorPath) // 读取作者目录下的漫画序列

                for (const mangaSeriesName of mangaSeriesEntries) {
                    const mangaSeriesPath = path.join(authorPath,mangaSeriesName)
                    let mangaSeriesStat
                    try {
                        mangaSeriesStat = await fs.stat(mangaSeriesPath)
                    } catch (error) {
                        console.warn(`无法读取漫画系列${mangaSeriesPath} 的信息:${error.message}`);
                        continue
                    }

                    if(mangaSeriesStat.isDirectory()){
                        const match = mangaSeriesName.match(mangaNamePattern)
                        console.log('match:',match);
                        if (match) {
                            const name = match[1].trim()
                            const ID = match[2].trim()
                            let imageCount = 0  // 当前漫画系列的图片计数器

                            const filesInMangaSeries = await fs.readdir(mangaSeriesPath)
                            for (const fileInSeries of filesInMangaSeries) {
                                const filePath = path.join(mangaSeriesPath,fileInSeries)
                                let fileStat
                                try {
                                    fileStat = await fs.stat(filePath)
                                } catch (error) {
                                    console.warn(`无法读取文件${filePath} 的信息: ${error.message}`);
                                    continue
                                }

                                if(fileStat.isFile() && path.extname(fileInSeries).toLowerCase() === '.webp'){
                                    imageCount++
                                }
                            }

                            // 漫画系列处理完毕，添加到当前作者漫画列表
                            mangasForThisAuthor.push({
                                name:name,
                                ID:ID,
                                num:imageCount,
                                path:mangaSeriesPath
                            })
                        } else {
                            console.warn(`漫画系列文件夹 “${mangaSeriesName}” 名称格式不匹配，已跳过`);
                        }
                    }
                }

                // 当前作者的所有漫画系列都处理完毕
                if (mangasForThisAuthor.length > 0){
                    finalResults.push({
                        author: curAuthorName,
                        mangas: mangasForThisAuthor
                    })
                }
            }
        }
        // console.log(JSON.stringify(finalResults, null, 2));
        return finalResults
    } catch (error) {
        console.warn('扫描漫画库失败:',error);
        return []
    }
}

scanMangas(libraryPath)