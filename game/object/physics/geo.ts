import { GameCtx } from "../../GameCtx";
import { Rect, Vec2 } from "./physics";

export type Block = Rect

export type Slope = Rect

export type Floor = {
    x: number,
    y: number,
    w: number,
}

export function slope(x: number, y: number, coef: number, length: number): Slope {

    const w = Math.sqrt(Math.pow(length, 2) / (1 + coef))

    return {
        x,
        y,
        w: w,
        h: w * coef
    }
}


export function getFloorY(gctx: GameCtx, x: number): number {
    const geo = gctx.state.world.stage.geo
    let res = 0
    geo.floors.forEach(floor => {
        if (floor.x < x && x < floor.x + floor.w) {
            res = floor.y
        }
    })

    geo.slopes.map(slope => {
        if (slope.x < x && x < slope.x + slope.w) {
            const y = slope.y + ((x - slope.x) * (slope.h / slope.w))
            res = y
        }
    })
    return res
}