export class Button {
    constructor(id, clickEvent) {
        document.getElementById(id).addEventListener("click", () => {
            clickEvent();
        });
    }
}
//# sourceMappingURL=button.js.map