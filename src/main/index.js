const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            webSecurity: true
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
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
});