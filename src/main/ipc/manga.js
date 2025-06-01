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
        // const a = await fs.readdir(libraryPath)
        // const b = await fs.readdir(libraryPath,{withFileTypes:true})

        const authorPath = await fs.readdir(libraryPath)


        console.log(authorPath);;

    } catch (error) {
        console.log('扫描漫画库失败:',error);
    }
}

scanMangas(libraryPath)