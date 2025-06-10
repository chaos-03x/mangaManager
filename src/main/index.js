const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const { setupMangaHandlers } = require('./ipc/mangaHandler.js')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    })

    // Menu.setApplicationMenu(null);

    // 开发环境时启用开发者工具
    win.webContents.openDevTools();
    // 开发环境时从Vite启动
    win.loadURL('http://localhost:5173');
    // win.loadFile('dist/index.html');

}

app.whenReady().then(() => {
    createWindow();
    setupMangaHandlers();
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
});