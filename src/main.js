const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const readline = require('readline');
const { Console } = require('console');


let win

function createWindow(){
    win = new BrowserWindow({
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

function main(){
    console.log('Welcome to use PIN. Press h for more info.')
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'PIN>>>'
    })
    winQueue = []

    rl.prompt()
    rl.on('line', (line) => {
        switch(line){
            case 'new':
                winQueue.push(createWindow())
                rl.prompt()
                break
            case 'rm':
                winQueue[winQueue.length-1].close()
                winQueue.pop()
                rl.prompt()
                break
            case 'q':
                process.exit(0)
            default:
                console.log(`Unrecognized command ${line}`)
        }
    }).on('close', () => {
        console.log('Bye!')
    })
}

app.on('ready', main)
