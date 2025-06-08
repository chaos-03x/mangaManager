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

    Menu.setApplicationMenu(null);

    // 开发环境时启用开发者工具
    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }

    win.loadURL('http://localhost:5173'); // 开发环境
    // win.loadFile('dist/index.html');

}

app.whenReady().then(() => {
    createWindow();
    // 确保在应用准备就绪后设置IPC处理程序
    setupMangaHandlers();
    
    // 确保在开发环境下显示开发者工具
    if (process.env.NODE_ENV === 'development') {
        const mainWindow = BrowserWindow.getAllWindows()[0];
        if (mainWindow) {
            mainWindow.webContents.openDevTools();
        }
    }
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
});