const { ipcMain } = require('electron')
const MangaScannerService = require('../../core/services/MangaScannerService')

ipcMain.handle('scan-mangas', async(event, libraryPath) => {
    console.log(`IPC 'scan-mangas' 接收到路径: ${libraryPath}`);
    if(!libraryPath || typeof libraryPath !== 'string') {
        console.error('IPC scan-mangas: 无效的 libraryPath');
        throw new Error('扫描失败: 提供的库路径无效')
    }
    try {
        // 在这里可以添加 Electron 特有的逻辑，例如：
        // 1. 路径安全校验 (例如，确保路径在用户允许的范围内)
        // 2. 进度通知 (如果扫描时间很长，可以通过 event.sender.send 发送进度更新)
        //    例如: event.sender.send('scan-progress', { processed: 10, total: 100 });
        const results = await MangaScannerService.scanLibrary(libraryPath)
        console.log(`扫描服务返回 ${results.length} 个作者条目。`);
        return results
    } catch (error) {
        console.error('IPC scan-mangas: 扫描漫画库失败:', error);
        throw new Error(`扫描漫画库时发生错误: ${error.message}`)
    }
})

// 如果你有其他与漫画相关的 IPC 处理器，也可以放在这里。
// 例如，未来获取漫画详情、保存漫画信息等。

// 如果你决定使用一个 setup 函数模式 (如朋友方案中的 mangaHandlers.js):
/*
function setupMangaHandlers() {
    ipcMain.handle('scan-mangas', async (event, libraryPath) => {
        // ... (如上实现)
    });
    // ... 其他 handlers
}
module.exports = { setupMangaHandlers };
// 然后在你的 main/index.js 中:
// const { setupMangaHandlers } = require('./ipc/mangaHandlers.js');
// app.whenReady().then(() => {
//   createWindow();
//   setupMangaHandlers();
// });
*/