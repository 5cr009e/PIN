const { remote } = require('electron')
const { app, dialog } = require('electron').remote
const fs  = require('fs')
const vditor = new Vditor('vditor', 
    {
        toolbarConfig: {
            pin: true,    
        },
        cache: {
            enable: false,    
        },
    after () {
        vditor.setValue('Pin!')}})

const vditor_element = document.getElementById('vditor')
const btn_new = document.getElementById('new-window')
btn_new.addEventListener("click", () => { app.appendWindow() })

/*
const btn_rm = document.getElementById('remove-window')
btn_rm.addEventListener("click", () => { app.removeWindow() })
*/
function save_content() {
    dialog.showSaveDialog({
        title: "Save File"
    }).then((res) => {
        console.log(res)
        fs.writeFileSync(res.filePath, vditor.getValue())
    }).catch((req) => console.log(req))
}

function load_content(){
    dialog.showOpenDialog(
        { properties: ['openFile'] }
    ).then((res) => {
        console.log(res.filePaths[0])
        vditor.setValue(fs.readFileSync(res.filePaths[0]))
    }).catch((req) => console.log(req))
}

const btn_save = document.getElementById('btn-save')
btn_save.addEventListener("click", () => { save_content() })

const btn_load = document.getElementById('btn-load')
btn_load.addEventListener("click", () => { load_content() })


/* initialize minimize variable */
minimize = false
const btn_minimize = document.getElementById('btn-minimize')
btn_minimize.addEventListener("click", () => {
    if (!minimize){
        remote.getCurrentWindow().setSize(400, 80)
        vditor_element.style.visibility  = 'hidden'
    } else {
        remote.getCurrentWindow().setSize(400, 800) 
        vditor_element.style.visibility  = 'visible'
    }
    console.log(minimize)
    minimize = !minimize
})

function update_theme(color){
    [
        '.top-bar',
        '#btn-minimize',
        '#btn-theme-cold',
        '#btn-theme-warm',
        '#btn-theme-black',
        '.dark-btn',
    ].forEach((e) => { document.querySelector(e).style.backgroundColor = color })
}

const btn_cold = document.getElementById('btn-theme-cold')
btn_cold.addEventListener("click", () => {
     update_theme('MidnightBlue')

})

const btn_warm = document.getElementById('btn-theme-warm')
btn_warm.addEventListener("click", () => {
     update_theme('SandyBrown')

})

const btn_black = document.getElementById('btn-theme-black')
btn_black.addEventListener("click", () => {
     update_theme('black')

})
