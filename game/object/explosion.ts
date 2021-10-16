import { GameCtx } from "../GameCtx";
import { Vec2 } from "./physics/physics";
import { drawImage } from "../render/lib";

export type Explosion = {
    x: number
    y: number
    v:  Vec2
    clock: number
}

export function newExplosion(gctx: GameCtx, x: number, y: number, v: Vec2) {
    const explosions = gctx.state.world.explosions
    explosions.push({
        x,
        y,
        v,
        clock: 0
    })
}

export function moveExplosion(gctx: GameCtx) {
    const explosions = gctx.state.world.explosions

    gctx.state.world.explosions = explosions.map(explosion => {
        explosion.clock += 1
        if (explosion.clock > 2) {
            explosion.x += explosion.v.x
            explosion.y += explosion.v.y
        }
        return explosion
    }).filter(explosion => explosion.clock < 20)
}

export function renderExplosions(gctx: GameCtx, cctx: CanvasRenderingContext2D) {
    const explosions = gctx.state.world.explosions

    explosions.forEach(explosion => {
        renderExplosion(gctx, cctx, explosion)
    })
}

function renderExplosion(gctx: GameCtx, cctx: CanvasRenderingContext2D, explosion: Explosion) {
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs
    const img = (() => {
        if (explosion.clock === 0) {
            return imgs['explosion-light-0']
        }
        if (explosion.clock < 3) {
            return imgs['explosion-light-1']
        }
        if (explosion.clock < 6) {
            return imgs['explosion-smog-0']
        }
        if (explosion.clock < 10) {
            return imgs['explosion-smog-1']
        }
        if (explosion.clock < 15) {
            return imgs['explosion-smog-2']
        }
        return imgs['explosion-smog-3']
    })();

    const scale = 1.5
    
    drawImage(cctx, {
        img: img,
        x: explosion.x - screen.x - 120,
        y: explosion.y - screen.y - 120,
        offset: {
            x: 0,
            y: 0,
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: false,
        rotate: 0,
    })
}