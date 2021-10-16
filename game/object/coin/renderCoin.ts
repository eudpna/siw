
import { GameCtx } from "../../GameCtx"
import { Vec2 } from "../physics/physics"
import { renderRect } from "../../render/lib"
import { Coin } from "./coin"

export function renderCoins(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    gctx.state.world.coins.map(coin => renderCoin(gctx, cctx, coin))
}

function renderCoin(gctx: GameCtx, cctx: CanvasRenderingContext2D, coin: Coin): void {
    const screen = gctx.state.world.screen
    
    const tmp = coin.clock % (10 + Math.round(coin.rollSpeed*10))

    if (tmp === 0) {
        cctx.beginPath();
        cctx.arc(coin.x + coin.w/2 - screen.x, coin.y+coin.h/2 - screen.y, (coin.w * Math.sqrt(2)) / 2, 0, 2 * Math.PI);
        cctx.fillStyle = 'white'
        cctx.fill()
        cctx.closePath()
    } else {
        if (coin.clock > (coin.life - 2) * 30) {
            if (coin.clock % 2 === 0) {
                return
            }
        }
        renderRotate(gctx, cctx, (1 + coin.rollSpeed) * 0.7 * coin.clock * 6 * (coin.direction === 'l' ? -1 : 1), {
            x: (coin.x + coin.w / 2) - screen.x,
            y: (coin.y + coin.h / 2) - screen.y
        }, () => {
            renderRect(gctx, cctx, coin, 'rgb(255, 185, 103)')
        })
    }
}


function renderRotate(gctx: GameCtx, cctx: CanvasRenderingContext2D, rotate: number, p: Vec2, func: () => any) {
    cctx.save();
    // move to the center of the canvas
    cctx.translate(p.x, p.y)
    // rotate the canvas to the specified degrees
    cctx.rotate(rotate * Math.PI / 180);
    cctx.translate(-p.x, -p.y)

    func()

    cctx.restore();
}