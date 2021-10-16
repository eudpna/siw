import { setTimeout } from "timers";
import { GameCtx } from "../GameCtx";
import { update } from "../update/update";

export type Timer = {
    fps: number
    count: number
    isOn: boolean
    schedule: number | null
}

export function newTimer(fps: number): Timer {
    return {
        fps: fps,
        count: 0,
        isOn: false,
        schedule: null,
    }
}

export function updateTimer(gctx: GameCtx) {
    const timer = gctx.state.timer
    if (timer.isOn) {
        gctx.state.timer.count++
        timer.schedule = window.setTimeout(() => {
            gctx.fire((gctx) => {
                update(gctx)
                updateTimer(gctx)
            })
        }, 1000/timer.fps)
    }
}

export function startTimer(gctx: GameCtx) {
    const timer = gctx.state.timer
    timer.count = -1
    timer.isOn = true
    updateTimer(gctx)
}

export function stopTimer(gctx: GameCtx) {
    const timer = gctx.state.timer
    timer.isOn = false
    timer.count = 0
    if (timer.schedule !== null) {
        clearTimeout(timer.schedule)
        timer.schedule = null
    }
}

export function pauseTimer(gctx: GameCtx) {
    const timer = gctx.state.timer
    timer.isOn = false
}
