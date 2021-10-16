import { GameCtx } from '../../GameCtx'

export function renderBullets(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen    
    const bullets = gctx.state.world.bullets

    cctx.fillStyle = 'black'
    bullets.forEach(bullet => {
        const [width, len] = (() => {
            if (bullet.level === 1) {
                return [5, 40]
            } else if (bullet.level === 2) {
                return [8, 50]
            } else {
                return [14, 80]
            }
        })();

        let rotate = 0

        const p1 = {
            x: 0,
            y: 0
        }
        const p2 = {
            x: 0,
            y: 0
        }

        // 左向き
        if (bullet.v.x < 0) {
            bullet.h = width
            bullet.w = len
            rotate = 180
            p1.x = bullet.x
            p1.y = bullet.y
            p2.x = bullet.x + bullet.w
            p2.y = bullet.y
        }
        // 右向き
        else if (bullet.v.x > 0) {
            bullet.h = width
            bullet.w = len
            rotate = 0
            p1.x = bullet.x + bullet.w
            p1.y = bullet.y
            p2.x = bullet.x
            p2.y = bullet.y
        }
        // 上向き
        else if (bullet.v.y < 0) {
            bullet.w = width
            bullet.h = len
            rotate = -90
            p1.x = bullet.x
            p1.y = bullet.y
            p2.x = bullet.x
            p2.y = bullet.y + bullet.h
        }
        // 下向き
        else {
            bullet.w = width
            bullet.h = len
            rotate = 90
            p1.x = bullet.x
            p1.y = bullet.y + bullet.h
            p2.x = bullet.x
            p2.y = bullet.y
        }
        

        cctx.save();
        // move to the center of the canvas
        const x = bullet.x  - screen.x
        const y = bullet.y + bullet.h / 5  - screen.y
        cctx.translate(x, y)

        cctx.translate(-x, -y)

        const g = cctx.createLinearGradient(p1.x - screen.x, p1.y - screen.y, p2.x - screen.x, p2.y - screen.y)
        g.addColorStop(1, "rgba(0, 0, 0, 0)")
        g.addColorStop(0, "rgba(0,0,0,1)")
        cctx.fillStyle = g
        
        cctx.fillRect(bullet.x - screen.x, bullet.y - 4 - screen.y, bullet.w, bullet.h)

        cctx.restore()  
    })
}

