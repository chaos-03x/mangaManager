const { ipcMain } = require('electron')
const path = require('path')
const fs = require('fs/promises')

// const libraryPath = "F:/Test"
const libraryPath = "C:/Users/z.chaos/Downloads/Test"
// 步骤 A：找到所有的作者文件夹。
// 步骤 B：对于每个作者，找到其名下所有的漫画系列文件夹。
// 步骤 C：对于每个漫画系列，提取漫画名和 ID。
// 步骤 D：对于每个漫画系列，统计里面的 .webp 图片数量。
// 步骤 E：将提取到的信息（作者、漫画名、ID、图片数、路径）整理并收集起来。

async function scanMangas(libraryPath) {
    try {
        const pattern = ''
        const authorFiles = await fs.readdir(libraryPath)
        const mangaFiles = []
        const mangaPath = ''
        const mangaInfo = [{
            author: '',
            mangas: [{ name: '', ID: '', num: 0, path: '' }],
        }]

        for (author of authorFiles) {
            // 拼接库目录下当前文件的完整路径
            authorFilePath = path.join(libraryPath, author)
            // 取得文件信息，判断是否为目录
            let authorFileStat = await fs.stat(authorFilePath)
            // 如果是作者目录
            if (authorFileStat.isDirectory() && author[0] == "#") {
                // 读取作者目录下所有文件名
                mangaFiles = await fs.readdir(authorFilePath)

                for (manga of mangaFiles) {
                    mangaFilePath = path.join(authorFilePath, manga)
                    let mangaFileStat = await fs.stat(mangaFilePath)
                    if (mangaFileStat.isDirectory()) {
                        // Carnal Chaldea (1362368)

                    }
                }

                mangaFiles = await fs.readdir()
            }
        }


        console.log(authorPath);;

    } catch (error) {
        console.log('扫描漫画库失败:', error);
    }
}

scanMangas(libraryPath)