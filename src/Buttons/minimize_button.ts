import {Button} from "./button";

const {remote} = require('electron')
export class MinimizeButton extends Button {
    minimize: boolean = false;
    constructor(id, vditor_element) {
        super(id, () => {
            if (!this.minimize) {
                remote.getCurrentWindow().setSize(400, 80);
                vditor_element.style.visibility = 'hidden';
            } else {
                remote.getCurrentWindow().setSize(400, 800);
                vditor_element.style.visibility = 'visible';
            }
            console.log(this.minimize);
            this.minimize = !this.minimize;
        })
        this.minimize = false;
    }
}

