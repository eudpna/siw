import { ImgCtx, drawImage } from '../../render/lib'
import { Bee } from './bee'
import { getDistance } from '../physics/math'
import { GameCtx } from '../../GameCtx'

export function renderBees(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen
    gctx.state.world.bees.filter(p => getDistance(p, screen) < 3000).map(bee => renderBee(gctx, cctx, bee))
}

export function renderBee(gctx: GameCtx, cctx: CanvasRenderingContext2D, bee: Bee): void {
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs

    // ダメージの瞬間
    if (bee.isDamaging && bee.damageClock === 0) return

    let offsetX = 0
    if (bee.isDamaging && bee.damageClock < 10) {
        if (Math.floor(bee.damageClock) % 2 === 0) {
            offsetX = -3
        } else {
            offsetX = 3
        }
    }

    const img = (() => {
        if (bee.clock % 2 === 0) return imgs['bee-0']
        else return imgs['bee-1']
    })();
    
    const scale = 0.35
    
    drawImage(cctx, {
        img: img,
        x: bee.x - screen.x - 34 + offsetX + 25,
        y: bee.y - screen.y - 10,
        offset: {
            x: 0,
            y: 0,
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: bee.direction === 'l',
        rotate: 0,
    })
}
