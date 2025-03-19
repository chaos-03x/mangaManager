const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname + 'preload.js'),
            nodeIntegration: false,
            contextIsonlation: true,
        },
    })

    win.loadURL('http://localhost:5173'); // 加载 Vite 本地服务器
    // win.loadFile('public/index.html');

}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit()
});