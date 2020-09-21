const { app } = require('electron').remote

const { Button } = require('./Buttons/Button')
const ChangeThemeButton = require('./Buttons/ChangeThemeButton').ChangeThemeButton
const MinimizeButton = require('./Buttons/MinimizeButton').MinimizeButton
const SaveButton = require('./Buttons/SaveLoadButton').SaveButton
const LoadButton = require('./Buttons/SaveLoadButton').LoadButton

const VditorComponent = require('./VditorComponent').VditorComponent

class PIN{
    constructor(){
        this.vditor = new VditorComponent()
        this.btn_minimize = new MinimizeButton('btn-minimize', this.vditor.getElement())
        this.btn_cold = new ChangeThemeButton('btn-theme-cold', 'MidnightBlue')
        this.btn_warm = new ChangeThemeButton('btn-theme-warm', 'SandyBrown')
        this.btn_black = new ChangeThemeButton('btn-theme-black', 'black')

        this.btn_new = new Button('new-window', app.appendWindow)
        this.btn_save = new SaveButton(this.vditor.getVditor() ,'btn-save')
        this.btn_load = new LoadButton(this.vditor.getVditor() ,'btn-load')
    }
}

exports.PIN = PIN;
