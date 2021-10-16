


import { moveBodi } from "../physics/bodi/moveBodi";
import { isHittingRects } from "../physics/rect/isHittingRects";
import { Bodi, Direction2, Rect } from "../physics/physics";
import { newExplosion } from "../explosion";
import { getDistance } from "../physics/math";
import { soundPlayerDamage, soundPlayerDie } from "../../sound/sound";
import { GameCtx } from "../../GameCtx";

export function damagePlayer(gctx: GameCtx) {
    const player = gctx.state.world.player
    if (gctx.state.isDevMode) return
    if (gctx.state.isClear) return
    
    
    const stage = gctx.state.world.stage

    if (player.isDamaging) {
        player.damageClock += 1
        if (player.damageClock === 45) {
            player.isDamaging = false
        }
        return
    }

     // 落下死亡
    if (player.y > (stage.y + stage.h)) {
        player.hp = 0
        player.isDead = true
        newExplosion(gctx, player.x, player.y - 40, {
            x: 0,
            y: 0
        })
        return
    }

    const range = 500

    gctx.state.world.mofus.filter(p => getDistance(p, player) < range).forEach(r => {
        _damagePlayerWithBodi(gctx, r)
    })
    gctx.state.world.bees.filter(p => getDistance(p, player) < range).forEach(r => {
        _damagePlayerWithBodi(gctx, r)
    })
    gctx.state.world.ufoBullets.filter(p => getDistance(p, player) < range).forEach(r => {
        _damagePlayerWithBodi(gctx, r)
    })
    if (gctx.state.world.laser !== null) {
        _damagePlayerWithBodi(gctx, gctx.state.world.laser)
    }
}

function _damagePlayerWithBodi(gctx: GameCtx, r: Rect) {
    const player = gctx.state.world.player
    if (isHittingRects(r, player)) {
        if (r.x < player.x) {
            _damagePlayer(gctx, 'r')
        } else {
            _damagePlayer(gctx, 'l')
        }
    }
}


export function _damagePlayer(gctx: GameCtx, direction: Direction2) {
    const player = gctx.state.world.player

    player.hp -= 1

    soundPlayerDamage(gctx)

    if (player.hp <= 0) {
        player.hp = 0
        player.isDead = true
    }

    if (player.isDead) {
        soundPlayerDie(gctx)
        newExplosion(gctx, player.x, player.y, {
            x: 0,
            y: 0
        })
        return
    }


    moveBodi(player, {
        x: (direction === 'l' ? -1 : 1) * 20,
        y: -10
    }, gctx.state.world.stage.geo, true)

    player.isJump = true
    player.isJumping = true
    player.isDamaging = true
    player.damageClock = 0
}