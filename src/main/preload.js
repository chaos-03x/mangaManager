const { contextBridge, ipcRenderer } = require('electron')

// 暴露安全的API给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
    scanMangas: () => ipcRenderer.send('scan-mangas'),
    onMangasUpdated: (callback) => ipcRenderer.on('mangas-updated', callback)
});