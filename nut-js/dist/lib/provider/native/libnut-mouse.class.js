"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libnut = require("@nut-tree/libnut");
const button_enum_1 = require("../../button.enum");
const point_class_1 = require("../../point.class");
class MouseAction {
    constructor() { }
    static buttonLookup(btn) {
        return this.ButtonLookupMap.get(btn);
    }
    setMouseDelay(delay) {
        libnut.setMouseDelay(delay);
    }
    setMousePosition(p) {
        return new Promise((resolve, reject) => {
            try {
                libnut.moveMouse(p.x, p.y);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    currentMousePosition() {
        return new Promise((resolve, reject) => {
            try {
                const position = libnut.getMousePos();
                resolve(new point_class_1.Point(position.x, position.y));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    click(btn) {
        return new Promise((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    doubleClick(btn) {
        return new Promise((resolve, reject) => {
            try {
                libnut.mouseClick(MouseAction.buttonLookup(btn), true);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    leftClick() {
        return this.click(button_enum_1.Button.LEFT);
    }
    rightClick() {
        return this.click(button_enum_1.Button.RIGHT);
    }
    middleClick() {
        return this.click(button_enum_1.Button.MIDDLE);
    }
    pressButton(btn) {
        return new Promise((resolve, reject) => {
            try {
                libnut.mouseToggle("down", MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    releaseButton(btn) {
        return new Promise((resolve, reject) => {
            try {
                libnut.mouseToggle("up", MouseAction.buttonLookup(btn));
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollUp(amount) {
        return new Promise((resolve, reject) => {
            try {
                libnut.scrollMouse(0, amount);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollDown(amount) {
        return new Promise((resolve, reject) => {
            try {
                libnut.scrollMouse(0, -amount);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollLeft(amount) {
        return new Promise((resolve, reject) => {
            try {
                libnut.scrollMouse(-amount, 0);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    scrollRight(amount) {
        return new Promise((resolve, reject) => {
            try {
                libnut.scrollMouse(amount, 0);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.default = MouseAction;
MouseAction.ButtonLookupMap = new Map([
    [button_enum_1.Button.LEFT, "left"],
    [button_enum_1.Button.MIDDLE, "middle"],
    [button_enum_1.Button.RIGHT, "right"],
]);
//# sourceMappingURL=libnut-mouse.class.js.map