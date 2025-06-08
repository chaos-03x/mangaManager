const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // 扫描指定路径的漫画库，返回Promise
    scanMangas: (libraryPath) => ipcRenderer.invoke('scan-mangas', libraryPath),
    // 监听扫描进度
    // onScanProgress: (callback) => ipcRenderer.on('scan-progress', callback)
})