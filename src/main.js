const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const readline = require('readline');
let winQueue = []
function createWindow(BrowserWindow){
    let win = new BrowserWindow({
        width: 400,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            experimentalFeatures: true
        },
        vibrancy: 'light'
    })
    win.setAlwaysOnTop(true, 'screen')
    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))
    return win
}

function appendWindow(){
    winQueue.push(createWindow(BrowserWindow))
}

function removeWindow(){
    winQueue[winQueue.length-1].close()
    winQueue.pop()
}


function main(){
    console.log('Welcome to use PIN. Press h for more info.')
    if (process.platform == "win32") {
        console.log('On win32 platform, cli is not support.')
        appendWindow()
    } else {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'PIN>>>'
        })
        rl.prompt()
        rl.on('line', (line) => {
            switch(line){
                case 'new':
                    appendWindow()
                    rl.prompt()
                    break
                case 'rm':
                    removeWindow()
                    rl.prompt()
                    break
                case 'q':
                    console.log("Bye!")
                    process.exit(0)
                default:
                    console.log(`Unrecognized command ${line}`)}})
    }
   
}

app.on('ready', main)
