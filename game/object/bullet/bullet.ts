
import { Bodi, Rect, Vec2 } from "../physics/physics";
import { HeadDirection } from "../player/player";
import { soundShot } from "../../sound/sound";
import { GameCtx } from "../../GameCtx";

const width = 5
const length = 40

export type Bullet = Rect & {
    v: Vec2,
    lifeClock: number
    level: 1 | 2 | 3
}

export function moveBullets(gctx: GameCtx) {
    gctx.state.world.bullets = gctx.state.world.bullets.map(bullet => {
        return {
            ...bullet,
                x: bullet.x + bullet.v.x,
                y: bullet.y + bullet.v.y,
            
            lifeClock: bullet.lifeClock -= 1
        }
    })
    // 寿命が尽きたら消滅する。
    gctx.state.world.bullets = gctx.state.world.bullets.filter(bullet => {
        return bullet.lifeClock > 0
    })
}

export function spawnBullet(gctx: GameCtx, direction: HeadDirection) {
    const player = gctx.state.world.player
    const bulletSpeed = 20 + player.level * 5
    const v = (() => {
        if (direction === 'f') {
            return ({
                x: player.direction ==='l' ?  -bulletSpeed : bulletSpeed,
                y: 0
            })
        }
        return ({
            x: 0,
            y: direction === 't' ? -bulletSpeed : bulletSpeed
        })
    })()
    const bulletX = player.x + player.w / 2

    const newBullet: Bullet = {
        v: v,
        x: (direction === 'f' && player.direction === 'l') ? bulletX - length - 10 : bulletX,
        y: direction === 't' ? player.y - length/2 : (direction === 'b' ? player.y + player.h/2 : (player.y + player.h/2 + 12)),
        w: direction === 'f' ? length : width,
        h: direction === 'f' ? width : length,
        lifeClock: 20,
        level: player.level,
    }
    gctx.state.world.bullets.push(newBullet)

    soundShot(gctx)
}