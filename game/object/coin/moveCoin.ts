import { GameCtx } from "../../GameCtx"
import { moveBodi } from "../physics/bodi/moveBodi"
import { getVolumeByDistance, soundCoinBounce } from "../../sound/sound"

import { Coin } from "./coin"

const coef = {   
    speedX: 3,
    jump: 25,
    gravity: 0.8,
}

export function moveCoins(gctx: GameCtx) {
    gctx.state.world.coins.map(coin => moveCoin(gctx, coin))
    gctx.state.world.coins = gctx.state.world.coins.filter(coin => coin.clock < coin.life * 30)
}

export function moveCoin(gctx: GameCtx, coin: Coin) {
    const player = gctx.state.world.player
    const geo = gctx.state.world.stage.geo



    const force = {
        x: 0,
        y: 0
    }

    
    if (coin.isGround) {
       force.y -= 9
       if (!player.isDead) soundCoinBounce(gctx, getVolumeByDistance(coin, player))
    }



    // 重力
    force.y += coef.gravity * (2 + coin.size) / 2.5

    moveBodi(coin, force, gctx.state.world.stage.geo)

    coin.clock += 1
}