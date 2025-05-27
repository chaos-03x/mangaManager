const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mangaAPI',{
    scanMangas: (libraryPath) => ipcRenderer.invoke('scan-mangas',libraryPath),
})