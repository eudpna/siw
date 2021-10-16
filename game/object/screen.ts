
import conf from "../conf";
import { GameCtx } from "../GameCtx";
import { restrict } from "./physics/math";
import { Rect } from "./physics/physics";


const maxV = 300
const divide = 10

export type Screen = Rect & {
    scale: number
}

export function newScreen(): Screen {
    return {
        x: 0,
        y: 0,
        w: conf.screen.w,
        h: conf.screen.h,
        scale: 0.8
    }
}

export function moveScreen(gctx: GameCtx) {
    const player = gctx.state.world.player
    const screen = gctx.state.world.screen

    const stage = gctx.state.world.stage
    
    const directionCount = player.directionClock

    const target = {
        x: player.x + player.w / 2 + (32 * 3 * (directionCount / 30))+30,
        y: player.y + (32 * 3 * (player.headDirectionClock / 30)) -150
    }

    const vx = restrict((screen.x - (target.x - (screen.w / screen.scale / 2))) / divide, -maxV, maxV)
    const vy = restrict((screen.y - (target.y - (screen.h / screen.scale / 2))) / divide, -maxV, maxV)

    let x = screen.x - vx
    let y = screen.y - vy

    screen.x = x
    screen.y = y

    // 制限
    if (screen.x < stage.x) screen.x = stage.x
    if (stage.x + stage.w - (screen.w / screen.scale) < screen.x) screen.x = stage.x + stage.w - (screen.w / screen.scale)
    if (screen.y < stage.y) screen.y = stage.y
    if (stage.y + stage.h - screen.h < screen.y) screen.y = stage.y + stage.h - screen.h
}