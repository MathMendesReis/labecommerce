export function verifyStrings(...args:any) {
    for (let index = 0; index < args.length; index++) {
        if (typeof args[index] !== "string") {
            return false
        }
        return true
    }
}
