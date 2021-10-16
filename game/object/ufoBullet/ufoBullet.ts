
import { GameCtx } from "../../GameCtx";
import { Bodi, Rect, Vec2 } from "../physics/physics";

export type UfoBullet = Rect & {
    v: Vec2,
    lifeClock: number
}

export function moveUfoBullets(gctx: GameCtx) {
    gctx.state.world.ufoBullets = gctx.state.world.ufoBullets.map(bullet => {
        return {
            ...bullet,
                x: bullet.x + bullet.v.x,
                y: bullet.y + bullet.v.y,
            
            lifeClock: bullet.lifeClock -= 1
        }
    })
    // 寿命が尽きたら消滅する。
    gctx.state.world.ufoBullets = gctx.state.world.ufoBullets.filter(bullet => {
        return bullet.lifeClock > 0
    })
}