export class ShortcutMap {
    constructor () {
        this.maxKeyCode = 255
        this.actionTable = new Array(2 * 2 * 2 * 2 * (this.maxKeyCode + 1))
    }

    static toInt (booleanVar) {
        // Number(booleanVar) / booleanVar|0 ... can be slot
        return booleanVar === true ? 1 : 0
    }

    /**
     * get flatten index of key
     *
     * @param key
     * @returns {number}
     */
    static tableIndex (key) {
        return this.toInt(key.ctrl) + 2 * this.toInt(key.alt) + 4 * this.toInt(key.shift) + 8 * this.toInt(key.meta) + 16 * key.code
    }

    /**
     * register key-action
     *
     * @param key
     * @param action
     */
    register (key, value, action) {
        if (!key || key.isEmpty()) {
            return
        }

        this.actionTable[ShortcutMap.tableIndex(key)] = {
            value: value,
            action: action
        }
    }

    /**
     * remove key-action
     *
     * @param key
     * @return: previous value of removed key
     */
    remove (key) {
        if (!key|| key.isEmpty()) {
            return null
        }

        const idx = ShortcutMap.tableIndex(key)
        const removed = this.actionTable[idx]

        this.actionTable[idx] = null

        if (removed) {
            return removed.value
        }

        return null
    }

    getValue (key) {
        const index = ShortcutMap.tableIndex(key)

        if (index < this.actionTable.length && this.actionTable[index]) {
            return this.actionTable[index].value
        }

        return null
    }

    /**
     * run action on key
     *
     * @param key
     * @type Key
     */
    run (key) {
        const index = ShortcutMap.tableIndex(key)

        if (index < this.actionTable.length && this.actionTable[index]) {
            this.actionTable[index].action()
            return true
        }

        return false
    }
}
