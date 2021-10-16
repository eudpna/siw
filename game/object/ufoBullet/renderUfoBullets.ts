import { GameCtx } from '../../GameCtx'

export function renderUfoBullets(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen
    const bullets = gctx.state.world.ufoBullets
    
    bullets.forEach(bullet => {
        cctx.beginPath();
        cctx.arc(bullet.x + bullet.w / 2 - screen.x, bullet.y + bullet.h / 2 - screen.y, (bullet.w * Math.sqrt(2)) / 2, 0, 2 * Math.PI);
        cctx.fillStyle = 'white'
        cctx.fill()
        cctx.strokeStyle = 'black'
        cctx.lineWidth = 5
        cctx.stroke()
        cctx.closePath()
    })
}