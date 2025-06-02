const { ipcMain } = require('electron')
const path = require('path')
const fs = require('fs/promises')

const libraryPath = "F:/Test"
// const libraryPath = "C:/Users/z.chaos/Downloads/Test"
// 步骤 A：找到所有的作者文件夹。
// 步骤 B：对于每个作者，找到其名下所有的漫画系列文件夹。
// 步骤 C：对于每个漫画系列，提取漫画名和 ID。
// 步骤 D：对于每个漫画系列，统计里面的 .webp 图片数量。
// 步骤 E：将提取到的信息（作者、漫画名、ID、图片数、路径）整理并收集起来。

async function scanMangas(libraryPath) {
    try {
        const pattern = /^(.*) \((\d+)\)$/
        const authorFiles = await fs.readdir(libraryPath)

        const mangaInfo = [{
            author: '',
            mangas: [{ name: '', ID: '', num: 0, path: '' }],
        }]

        for (let authorFile of authorFiles) {
            // 拼接库目录下当前文件的完整路径
            let authorFilePath = path.join(libraryPath, authorFile)
            // 取得文件信息，判断是否为目录
            let authorFileStat = await fs.stat(authorFilePath)
            // 如果是作者目录
            if (authorFileStat.isDirectory() && authorFile[0] == "#") {
                // 读取作者目录下所有文件名
                let mangaFiles = await fs.readdir(authorFilePath)
                // 遍历漫画目录中的所有文件
                for (let mangaFile of mangaFiles) {
                    let mangaFilePath = path.join(authorFilePath, mangaFile)
                    let mangaFileStat = await fs.stat(mangaFilePath)
                    if (mangaFileStat.isDirectory()) {
                        // Carnal Chaldea (1362368)
                        let [name, id] = mangaFile.match(pattern)

                        let pics = await fs.readdir(mangaFilePath)
                        let num = 0
                        for (let pic of pics) {
                            let picPath = path.join(mangaFilePath, pic)
                            let picStat = await fs.stat(picPath)
                            if (picStat.isFile()) { 
                                if (path.extname(picPath).toLowerCase() === '.webp'){
                                    num += 1
                                    // 汇总信息
                                    let mangas = {name,id,num,mangaFilePath}
                                    mangaInfo.push({authorFile,mangas})
                                }
                            }
                        }
                    }
                }

            }
        }


        console.log(mangaInfo);;

    } catch (error) {
        console.log('扫描漫画库失败:', error);
    }
}
