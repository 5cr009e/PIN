const {Button} = require('./Button')

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

exports.ChangeThemeButton = ChangeThemeButton