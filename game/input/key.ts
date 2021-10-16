import { GameCtx } from "../GameCtx"

export function listenKey(gctx: GameCtx) {
    window.addEventListener('keydown', (e) => {
        gctx.fire((gctx) => {
            addKey(gctx, e.key)
        })
    })
    window.addEventListener('keyup', (e) => {
        gctx.fire((gctx) => {
            removeKey(gctx, e.key)
        })
    })
}

function addKey(gctx: GameCtx, key: string) {
    const input = gctx.state.input
    input.keys.push(replaceKeyName(modifyKeyName(key)))
}

function removeKey(gctx: GameCtx, key: string) {
    const input = gctx.state.input
    input.keys = input.keys.filter(k => k !== replaceKeyName(modifyKeyName(key)))
}

export function modifyKeyName(key: string): string {
    return key.toLowerCase()
        .replace('arrowleft', 'left')
        .replace('arrowright', 'right')
        .replace('arrowdown', 'down')
        .replace('arrowup', 'up')
}

// specific to this project
function replaceKeyName(key: string): string {
    if (key === 'a') return 'left'
    if (key === 'd') return 'right'
    if (key === 's') return 'down'
    if (key === 'w') return 'up'
    if (key === 'j') return 'z'
    if (key === 'k') return 'x'
    return key
}

export function hasJustKeyDown(gctx: GameCtx, ...keys: string[]): boolean {
    return gctx.state.input.events
        .filter(event => event.type === 'keydown')
        .filter(event => {
            return keys.includes(event.key!)
        }).length !== 0
}

export function isKeyDown(gctx: GameCtx, ...keys: string[]): boolean {
    return keys.filter(key => {
        return gctx.state.input.keys.includes(key)
    }).length !== 0
}