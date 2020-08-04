const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')


let win

function createWindow(){
    win = new BrowserWindow({
        width: 400,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.setAlwaysOnTop(true, 'screen')
    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))
}

app.on('ready', createWindow)
