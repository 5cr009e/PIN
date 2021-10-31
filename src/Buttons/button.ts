export class Button {
    constructor(id: string, clickEvent: any) {
        document.getElementById(id).addEventListener("click", () => {
            clickEvent()
        })
    }
}
