class Button{
    constructor(id, clickEvent){
        this.btn = document.getElementById(id).addEventListener("click", () => { clickEvent() })
        return this.btn
    }
}

exports.Button = Button