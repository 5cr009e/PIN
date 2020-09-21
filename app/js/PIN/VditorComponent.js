class VditorComponent{
    constructor(initValue = 'Pin!'){
        let vditor = new Vditor('vditor', 
            {
                toolbarConfig: {
                    pin: true,    
                },
                cache: {
                    enable: false,    
                },
                after () {
                    vditor.setValue(initValue)}})
        this.vditor = vditor
    }

    getElement(){
        return document.getElementById('vditor')
    }

    getVditor(){
        return this.vditor
    }
}
exports.VditorComponent = VditorComponent