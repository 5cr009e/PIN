import { Button } from "./button";
import { readFileSync, writeFileSync } from "fs";
const { dialog } = require('electron').remote;
// const fs = require('fs')
export class SaveButton extends Button {
    constructor(vditor, id) {
        super(id, () => {
            dialog.showSaveDialog({
                title: "Save File"
            }).then((res) => {
                console.log(res);
                writeFileSync(res.filePath, vditor.getValue());
            }).catch((req) => console.log(req));
        });
    }
}
export class LoadButton extends Button {
    constructor(vditor, id) {
        super(id, () => {
            dialog.showOpenDialog({ properties: ['openFile'] }).then((res) => {
                vditor.setValue(readFileSync(res.filePaths[0]));
            }).catch((req) => console.log(req));
        });
    }
}
//# sourceMappingURL=save_load_button.js.map