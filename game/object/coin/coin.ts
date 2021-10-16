import { getRandomInt } from "../../content/stage/makeGeo";
import { GameCtx } from "../../GameCtx";
import { Bodi, Direction2, Vec2 } from "../physics/physics";

export type Coin = Bodi & {
    clock: number
    direction: Direction2
    rollSpeed: number
    size: number
    life: number
    score: number
}

export function newCoin(x: number, y: number, v: Vec2, score: number, size: number, rollSpeed: number, direction?: Direction2) {
    const newCoin: Coin = {
        // bodi
        x,
        y,
        w: 15 + size * 10,
        h: 15 + size * 10,
        score,
        v,
        direction: direction ? direction : (Math.round(Math.random()) === 0 ? 'l' : 'r'),
        clock: 0,
        rollSpeed,
        size,
        life: 7 + 5 * (1 - rollSpeed),
        drag: 0.05
    }
    return newCoin
}

export function makeCoins(gctx: GameCtx, p: Vec2, scores: number[]) {
    scores.map(score => {
        gctx.state.world.coins.push(
            newCoin(p.x, p.y, {
                x: getRandomInt(-5, 5),
                y: getRandomInt(-13, -9)
            }, score, score / 3, Math.random())
        )
    })
}

