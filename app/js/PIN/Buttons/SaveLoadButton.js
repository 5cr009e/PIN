const { dialog } = require('electron').remote
const {Button} = require('./Button')

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

exports.SaveButton = SaveButton
exports.LoadButton = LoadButton