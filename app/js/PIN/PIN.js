const {app} = require('@electron/remote')

const {Button} = require('./Buttons/Button')
const ChangeThemeButton = require('./Buttons/ChangeThemeButton').ChangeThemeButton
const MinimizeButton = require('./Buttons/MinimizeButton').MinimizeButton
const SaveButton = require('./Buttons/SaveLoadButton').SaveButton
const LoadButton = require('./Buttons/SaveLoadButton').LoadButton

const VditorComponent = require('./VditorComponent').VditorComponent

class PIN {
    change_theme_buttons = new Map();
    button_anchors = ['.top-bar', '#btn-minimize', '.dark-btn'];

    addChangeThemeButton(theme) {
        let change_color_button_id = 'btn-theme-' + theme["theme"];
        let current_anchors = this.button_anchors;
        let update_theme = function (color) {
            current_anchors.forEach((e) => {
                document.querySelector(e).style.backgroundColor = color
            })
        }
        this.change_theme_buttons[change_color_button_id] = new ChangeThemeButton(change_color_button_id, theme["color"], update_theme);
    }

    constructor() {
        this.buttons = [];
        this.vditor = new VditorComponent();
        this.btn_minimize = new MinimizeButton('btn-minimize', this.vditor.getElement());
        this.themes = app.loadThemes();
        this.themes.forEach((theme) => this.button_anchors.push('#' + 'btn-theme-' + theme["theme"]));
        this.themes.forEach((theme) => this.addChangeThemeButton(theme));
        console.log(this.change_theme_buttons)

        this.btn_new = new Button('new-window', app.appendWindow);
        this.btn_save = new SaveButton(this.vditor.getVditor(), 'btn-save');
        this.btn_load = new LoadButton(this.vditor.getVditor(), 'btn-load');
    }
}

exports.PIN = PIN;
