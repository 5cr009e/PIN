require('@electron/remote/main').initialize()
const {app, BrowserWindow, webContents } = require('electron')

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
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false,
            experimentalFeatures: true,
        },
        vibrancy: 'light'
    })
    win.setAlwaysOnTop(true, 'screen')
    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'app/index.html'),
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
require('@electron/remote/main').enable(webContents);
require('@electron/remote/main').enable(app.loadThemes);
require('@electron/remote/main').enable(app.appendWindow);

function main(){
    // console.log('Welcome to use PIN. Press h for more info.')
    // if (process.platform == "win32") {
    //     console.log('On win32 platform, cli is not support.')
    //     app.appendWindow()
    // } else {
    //     const rl = readline.createInterface({
    //         input: process.stdin,
    //         output: process.stdout,
    //         prompt: 'PIN>>>'
    //     })
    //     rl.prompt()
    //     rl.on('line', (line) => {
    //         switch(line){
    //             case 'new':
    //                 app.appendWindow()
    //                 rl.prompt()
    //                 break
    //             case 'rm':
    //                 app.removeWindow()
    //                 rl.prompt()
    //                 break
    //             case 'q':
    //                 console.log("Bye!")
    //                 process.exit(0)
    //             default:
    //                 console.log(`Unrecognized command ${line}`)}
    //         rl.close()
    //         rl.prompt()
    //     }).on('close',function(){
    //         process.exit(0);
    //     }); 
    // }
    app.appendWindow(); 

}

app.on('ready', main)
