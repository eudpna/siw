import { GameCtx } from "../GameCtx"
import { modifyKeyName } from "./key"

export type EventLog = {
    type: string
    key: string | null
}

function addEvent(gctx: GameCtx, eventLog: EventLog) {
    const input = gctx.state.input
    // 長押しで連打されないようにする
    if (eventLog.type === 'keydown' && input.keys.includes(eventLog.key!)) return
    if (eventLog.type === 'keyup' && !input.keys.includes(eventLog.key!)) return
    input.events.push(eventLog)
}

export function listenEvents(gctx: GameCtx) {
    ['click', 'mouseup', 'mousedown', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'keydown', 'keyup'].forEach(type => {
        window.addEventListener(type, e => {
            const eventLog = type === 'keyup' || type === 'keydown' ? {
                type: type,
                key: modifyKeyName((e as KeyboardEvent).key)
            } : {
                type: type,
                key: null
            }
            gctx.fire((gctx) => {
                addEvent(gctx, eventLog)
            })
        })
    });
}

