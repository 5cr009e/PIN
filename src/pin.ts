import {VditorComponent} from "./vditor_component";
import {ChangeThemeButton} from "./Buttons/change_theme_button";
import {Button} from "./Buttons/button";
import {MinimizeButton} from "./Buttons/minimize_button";
import {LoadButton, SaveButton} from "./Buttons/save_load_button";

export class PIN {
    change_theme_buttons: Map<string, ChangeThemeButton> = new Map();
    button_anchors: string[] = ['.top-bar', '#btn-minimize', '.dark-btn'];
    vditor: VditorComponent;
    btn_minimize: MinimizeButton;
    themes: Map<string, string>
    btn_new: Button;
    btn_save: SaveButton;
    btn_load: LoadButton;

    addChangeThemeButton(theme) {
        let change_color_button_id = 'btn-theme-' + theme["theme"];
        let current_anchors = this.button_anchors;
        let update_theme = function (color) {
            current_anchors.forEach((e) => {
                let colored_element: HTMLElement = document.querySelector(e);
                colored_element.style.backgroundColor = color;
            })
        }
        this.change_theme_buttons[change_color_button_id] = new ChangeThemeButton(change_color_button_id, theme["color"], update_theme);
    }

    constructor() {
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
