import { GameCtx } from "../../GameCtx"
import { drawImage } from "../../render/lib"
import { explodeDelay } from "./moveUfo"

export function renderUfo(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs
    const ufo = gctx.state.world.ufo
    if (ufo === null) return
    const img = imgs['ufo']

    if (ufo.isDead && ufo.deadClock >= explodeDelay) {
        return
    }

    // ダメージの瞬間
    if (ufo.isDamaging && ufo.damageClock === 0) return

    let offsetX = 0
    if (ufo.isDamaging && ufo.damageClock < 10) {
        if (Math.floor(ufo.damageClock) % 2 === 0) {
            offsetX = -3
        } else {
            offsetX = 3
        }
    }

    const rotate = ufo.v.x


    const scale = 0.6
    if (ufo.isDead && ufo.deadClock >= explodeDelay) return
    drawImage(cctx, {
        img: img,
        x: ufo.x - screen.x - 24 + offsetX + 15 + (img.width * scale / 2),
        y: ufo.y - screen.y - (img.height * scale / 2),
        offset: {
            x: (img.width * scale / 2),
            y: (img.height * scale / 2),
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: true,
        rotate: rotate,
    })
}



export function renderLastExplosion(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen

    const ufo = gctx.state.world.ufo
    if (ufo === null) return

    if (ufo.isDead && ufo.deadClock >= explodeDelay) {

        if (ufo.deadClock < 150) {

            const tmp = (150 - ufo.deadClock) / 50
            cctx.fillStyle = `rgb(255,255,255,${tmp})`
            cctx.fillRect(0, 0, screen.w, screen.h)
        }
        return
    }
}

