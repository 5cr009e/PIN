const { remote } = require('electron')
const fs  = require('fs')
const { app, dialog } = require('electron').remote

class Button{
    constructor(id, clickEvent){
        this.btn = document.getElementById(id).addEventListener("click", () => { clickEvent() })
        return this.btn
    }
}

class ChangeThemeButton extends Button{
    constructor(id, theme){
        let update_theme = function(color){
            [
                '.top-bar',
                '#btn-minimize',
                '#btn-theme-cold',
                '#btn-theme-warm',
                '#btn-theme-black',
                '.dark-btn',
            ].forEach((e) => { document.querySelector(e).style.backgroundColor = color })
        }
        super(id, () => {update_theme(theme)})
        // this.update_theme = update_theme
    }
}

class MinimizeButton extends Button{
    constructor(id, vditor_element){
        super(id, () => {
            if (!this.minimize){
                remote.getCurrentWindow().setSize(400, 80)
                vditor_element.style.visibility  = 'hidden'
            } else {
                remote.getCurrentWindow().setSize(400, 800) 
                vditor_element.style.visibility  = 'visible'
            }
            console.log(this.minimize)
            this.minimize = !this.minimize
        })
        this.minimize = false
    }
}

class SaveButton extends Button{
    constructor(vditor, id){
        super(id, () => {
            dialog.showSaveDialog({
                title: "Save File"
            }).then((res) => {
                console.log(res)
                fs.writeFileSync(res.filePath, vditor.getValue())
            }).catch((req) => console.log(req))
        })
    }
}

class LoadButton extends Button{
    constructor(vditor, id){
        super(id, () => {
            dialog.showOpenDialog(
            { properties: ['openFile'] }
        ).then((res) => {
            console.log(res.filePaths[0])
            vditor.setValue(fs.readFileSync(res.filePaths[0]))
        }).catch((req) => console.log(req))})
    }
}

class VditorComponent{
    constructor(initValue = 'Pin!'){
        let vditor = new Vditor('vditor', 
            {
                toolbarConfig: {
                    pin: true,    
                },
                cache: {
                    enable: false,    
                },
                after () {
                    vditor.setValue(initValue)}})
        this.vditor = vditor
    }

    getElement(){
        return document.getElementById('vditor')
    }

    getVditor(){
        return this.vditor
    }
}

class PIN{
    constructor(){
        this.vditor = new VditorComponent()
        this. btn_minimize = new MinimizeButton('btn-minimize', this.vditor.getElement())
        this. btn_cold = new ChangeThemeButton('btn-theme-cold', 'MidnightBlue')
        this. btn_warm = new ChangeThemeButton('btn-theme-warm', 'SandyBrown')
        this. btn_black = new ChangeThemeButton('btn-theme-black', 'black')

        this.btn_new = new Button('new-window', app.appendWindow)
        this.btn_save = new SaveButton(this.vditor.getVditor() ,'btn-save')
        this.btn_load = new LoadButton(this.vditor.getVditor() ,'btn-load')
    }
}

new PIN()

