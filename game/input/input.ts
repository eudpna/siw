import { GameCtx } from "../GameCtx";
import { EventLog, listenEvents } from "./event";
import { listenKey } from "./key";
import { listenMouse, Mouse, newMouse } from "./mouse";

export type Input = {
    keys: string[],
    mouse: Mouse,
    events: EventLog[]
}

export function newInput(): Input {
    return {
        keys: [],
        mouse: newMouse(),
        events: [],
     }
}

export function listenInputs(gctx: GameCtx) {
    listenEvents(gctx)
    listenKey(gctx)
    listenMouse(gctx)
}
