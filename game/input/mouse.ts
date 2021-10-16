import { GameCtx } from "../GameCtx"

export type Mouse = {
    isDown: boolean
    x: number
    y: number
}

export function newMouse(): Mouse {
    return {
        isDown: false,
        x: 0,
        y: 0,
    }
}

export function setMouseInput(gctx: GameCtx, mouse: Mouse) {
    const input = gctx.state.input
    input.mouse = mouse
}


export function listenMouse(gctx: GameCtx) {
    window.addEventListener('mousedown', (e) => {
        gctx.fire((gctx) => {
            setMouseInput(gctx, {
                ...gctx.state.input.mouse,
                isDown: true
            })
        })
    })
    window.addEventListener('mouseup', (e) => {
        gctx.fire((gctx) => {
            setMouseInput(gctx, {
                ...gctx.state.input.mouse,
                isDown: false
            })
        })
    })
    window.addEventListener('mousemove', (e) => {
        gctx.fire((gctx) => {
            setMouseInput(gctx, {
                ...gctx.state.input.mouse,
                x: e.offsetX,
                y: e.offsetY
            })
        })
    })
}
