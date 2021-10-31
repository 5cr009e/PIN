const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
// const readline = require('readline');
// var readlineSync = require('readline-sync');

app.winQueue = []
function createWindow(BrowserWindow){
    let win = new BrowserWindow({
        width: 400,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            experimentalFeatures: true
        },
        vibrancy: 'light'
    })
    win.setAlwaysOnTop(true, 'screen')
    win.loadURL(format ({
        pathname: join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))
    win.webContents.openDevTools();
    return win
}

app.appendWindow = function (){
    app.winQueue.push(createWindow(BrowserWindow))
}

app.removeWindow = function (){
    app.winQueue[app.winQueue.length-1].close()
    app.winQueue.pop()
}

app.loadThemes = function () {
    return require('./themes.json');
}

function main(){
    app.appendWindow();
}

app.on('ready', main)
