import Vditor from "node_modules/vditor/dist/index";
export class VditorComponent {
    vditor;
    constructor(initValue = 'Pin!') {
        let vditor = new Vditor('vditor', {
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            after() {
                vditor.setValue(initValue);
            }
        });
        this.vditor = vditor;
    }
    getElement() {
        return document.getElementById('vditor');
    }
    getVditor() {
        return this.vditor;
    }
}
//# sourceMappingURL=vditor_component.js.map