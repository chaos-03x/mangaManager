async function scanMangas(libraryPath) {
    const pattern = /^(.*) \((\d+)\)$/
    const mangaInfo = []

    try {

        const authorFiles = await fs.readdir(libraryPath)

        for (let authorFile of authorFiles) {   // # Misaka12003
            let authorFilePath = path.join(libraryPath, authorFile) // F:\Test\# Misaka12003
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
                                if (path.extname(picPath).toLowerCase() === '.webp') {
                                    num += 1
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