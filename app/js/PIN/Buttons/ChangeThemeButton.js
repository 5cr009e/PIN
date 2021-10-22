const {Button} = require('./Button')

class ChangeThemeButton extends Button {
    constructor(id, theme, update_theme) {
        super(id, () => {
            update_theme(theme)
        })
        // this.update_theme = update_theme
    }
}

exports.ChangeThemeButton = ChangeThemeButton