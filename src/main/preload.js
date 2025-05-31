const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mangaAPI',{
    scanMangas: (libraryPath) => ipcRenderer.send('scan-mangas',libraryPath),
})