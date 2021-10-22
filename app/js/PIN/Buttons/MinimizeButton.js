const {remote} = require('electron')
const {Button} = require('./Button')


class MinimizeButton extends Button {
    constructor(id, vditor_element) {
        super(id, () => {
            if (!this.minimize) {
                remote.getCurrentWindow().setSize(400, 80)
                vditor_element.style.visibility = 'hidden'
            } else {
                remote.getCurrentWindow().setSize(400, 800)
                vditor_element.style.visibility = 'visible'
            }
            console.log(this.minimize)
            this.minimize = !this.minimize
        })
        this.minimize = false
    }
}

exports.MinimizeButton = MinimizeButton