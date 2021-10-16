

import { ImgCtx, drawImage } from '../../render/lib'
import { Mofu } from './mofu'
import { getDistance } from '../physics/math'
import { GameCtx } from '../../GameCtx'

export function renderMofus(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen
    gctx.state.world.mofus.filter(p => getDistance(p, screen) < 3000).map(mofu => renderMofu(gctx, cctx, mofu))
}

export function renderMofu(gctx: GameCtx, cctx: CanvasRenderingContext2D, mofu: Mofu): void {
    const screen = gctx.state.world.screen
    const player = gctx.state.world.player
    const imgs = gctx.resource.imgs
    

    // 遠くにいるときは描画しない
    // if (getDistance(mofu, player) > screen.w * 3) return

    // ダメージの瞬間
    if (mofu.isDamaging && mofu.damageClock === 0) return

    let offsetX = 0
    if (mofu.isDamaging && mofu.damageClock < 10) {
        if (Math.floor(mofu.damageClock) % 2 === 0) {
            offsetX = -3
        } else {
            offsetX = 3
        }
    }

    const img = (() => {
        if (mofu.v.x !== 0) {
            return imgs['mofu-jump']
        }
        if (mofu.phase === 'sleep') {
            return imgs['mofu-sleep']
        }
        return imgs['mofu-awake']
    })();
    
    if (mofu.isBig) {
        const scale = 0.8
        drawImage(cctx, {
            img: img,
            x: mofu.x - screen.x - 24 + offsetX,
            y: mofu.y - screen.y - 10,
            offset: {
                x: 0,
                y: 0,
            },
            w: img.width * scale,
            h: img.height * scale,
            flipH: mofu.direction === 'l',
            rotate: 0,
        })
    } else {
        const scale = 0.6
        drawImage(cctx, {
            img: img,
            x: mofu.x - screen.x - 24 + offsetX,
            y: mofu.y - screen.y,
            offset: {
                x: 0,
                y: 0,
            },
            w: img.width * scale,
            h: img.height * scale,
            flipH: mofu.direction === 'l',
            rotate: 0,
        })
    }
   

    // renderRect(gctx, cctx, mofu, 'green')




}
