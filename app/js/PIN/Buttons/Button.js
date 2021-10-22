class Button {
    constructor(id, clickEvent) {
        document.getElementById(id).addEventListener("click", () => {
            clickEvent()
        })
    }
}

exports.Button = Button