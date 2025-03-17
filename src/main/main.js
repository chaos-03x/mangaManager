const { app, BroswerWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BroswerWindow({
        width: 600,
        height: 800,
        webPreferences:{
            preload: path.join(__dirname + 'preload.js'),
            nodeIntegration: false,
            contextIsonlation: true,
        },
    })

    win.loadFile('public/index.html');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if(process.platform != 'darwin') app.quit()
});