
import { Bodi, Rect, Vec2 } from "../physics/physics";
import { soundLaser } from "../../sound/sound";
import { GameCtx } from "../../GameCtx";

export type Laser = Rect & {
    clock: number
}

export function moveLaser(gctx: GameCtx) {
    const laser = gctx.state.world.laser
    if (laser === null) return
    laser.clock ++
    if (laser.clock >= 30 * 2.3) gctx.state.world.laser = null
}

export function makeLaser(gctx: GameCtx, x: number, y: number) {
    soundLaser(gctx)
    gctx.state.world.laser = {
        x,
        y,
        w: 70, 
        h: 10000,
        clock: 0
    }
}