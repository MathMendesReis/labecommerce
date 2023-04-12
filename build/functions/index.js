"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyStrings = void 0;
function verifyStrings(...args) {
    for (let index = 0; index < args.length; index++) {
        if (typeof args[index] !== "string") {
            return false;
        }
        return true;
    }
}
exports.verifyStrings = verifyStrings;
//# sourceMappingURL=index.js.map