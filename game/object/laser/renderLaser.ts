import { GameCtx } from '../../GameCtx'
import { ImgCtx, drawImage, renderRect } from '../../render/lib'

export function renderLaser(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen
    const laser = gctx.state.world.laser
    if (laser === null) return

    let offset = 0

    offset += ((laser.clock) % 3) * 2
    offset -= ((laser.clock) % 4) * 2


    renderRect(gctx, cctx, {
        x: laser.x + offset,
        y: laser.y,
        w: 70,
        h: 10000
    }, 'white')

    renderRect(gctx, cctx, {
        x: laser.x + offset,
        y: laser.y,
        w: 70,
        h: 10000
    }, 'black', true)


    const x = laser.x - screen.x
    const y = laser.y - screen.y
    const w = 100
    const h = 100
    
    const g = cctx.createRadialGradient(x, y, 30, w, h, 70)
    // Add three color stops
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(1, 'rgba(255,255,255,1)');

    // Set the fill style and draw a rectangle
    
    cctx.fillStyle = g;
    cctx.fillRect(x, y, 100, 100);
}