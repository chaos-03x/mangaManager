/**
 * Description: 漫画库的API接口，解析漫画目录结构
 */

const fs = require('fs/promises');
const path = require('path');

// 用 const 定义根路径和图片后缀
const MANGA_ROOT = path.normalize('F://Test')
const IMAGE_EXT = '.webp'

// 异步函数
async function scanComics() {
    // JSON 结构
    const result = { comics: [] }

    // 错误处理
    try {
        // 获取根目录下的所有 author ，然后遍历 author
        const authors = await fs.readdir(MANGA_ROOT)
        
        for (const author of authors) {
            const authorPath = path.join(MANGA_ROOT, author)
            // 判断 author 文件夹下是否有文件夹以外的文件，若有则跳过该文件
            const stat = await fs.stat(authorPath)
            if (!stat.isDirectory()) continue

            // 获取当前 author 文件夹下的所有 comics，然后遍历 comics
            const comics = await fs.readdir(authorPath)

            for (const comicDir of comics) {
                const comicPath = path.join(authorPath, comicDir)
                const comicStat = await fs.stat(comicPath)
                if (!comicStat.isDirectory()) continue

                // 使用更健壮的正则解析
                const match = comicDir.match(/^(.*?)\s*\((\d+)\)$/) // 同时捕获名称和代码, 返回一个数组，第一个元素是完整的匹配字符串
                if (!match) continue // 跳过格式不正确的目录

                const [, comicName, code] = match   // 数组解构赋值
                const files = await fs.readdir(comicPath)   // 遍历漫画文件
                
                // 批量获取漫画文件夹下所有文件的 stat ，并保存到数组 fileStats中
                const fileStats = await Promise.all(    // 等待所有 Promise 完成，返回一个包含所有文件 stat 结果的数组 fileStats, PS.如果没加await，得到的不是结果数组，而是Promise.all返回的Promise
                    files.map(f => fs.stat(path.join(comicPath, f)))    // map方法遍历数组中每个元素，将每个文件名 f 转换为一个 fs.stat 的 Promise，生成一个 Promise 数组。
                );

                result.comics.push({
                    author, // ES6 允许在对象字面量中直接使用变量名作为键和值
                    comic: comicName.trim(), // trim() 方法用于删除字符串的头尾空白符
                    code,
                    page_num: files.filter((f, i) => // 遍历 files 数组，i 是当前文件的索引，对应 fileStats 中的结果。
                        f.endsWith(IMAGE_EXT) && !fileStats[i].isDirectory()
                    ).length
                })
            }
        }

        return JSON.stringify(result, null, 2)
    } catch (error) {
        console.error('扫描失败:', error)
        process.exit(1)
    }
}

scanComics().then((res)=>{
    fs.writeFile('./comicData.json', res, err=>console.log(err))
})
