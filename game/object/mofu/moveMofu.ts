import { makeCoins, newCoin } from "../coin/coin"
import { getRandomInt } from "../../content/stage/makeGeo"
import { moveBodi } from "../physics/bodi/moveBodi"

import { getDistance } from "../physics/math"
import { isHittingRects } from "../physics/rect/isHittingRects"

import { getVolumeByDistance, soundDestroyEnemy, soundEnemyHurt, soundMofuJump } from "../../sound/sound"

import { newExplosion } from "../explosion"
import { Mofu } from "./mofu"
import { GameCtx } from "../../GameCtx"

const coef = {   
    speedX: 3,
    jump: 25,
    gravity: 1.6,
}


export function moveMofus(gctx: GameCtx) {
    const screen = gctx.state.world.screen
    gctx.state.world.mofus.filter(p => getDistance(p, screen) < 3000).map(mofu => moveMofu(gctx, mofu))
}

export function moveMofu(gctx: GameCtx, mofu: Mofu) {
    const player = gctx.state.world.player

    // 常にプレイヤーの方を向く
    if (mofu.isGround) {
        if (mofu.x < player.x) {
            mofu.direction = 'l'
        } else {
            mofu.direction = 'r'
        }
    }

    // 状態を決定
    if (getDistance(mofu, player) > 400) {
        mofu.phase = 'sleep'
    } else if (getDistance(mofu, player) > 360) {
        mofu.phase = 'awake'
    } else {
        mofu.phase = 'attack'
    }

    if (mofu.isAwake) {
        if (getDistance(mofu, player) > 2000) {
            mofu.phase = 'sleep'
        } else {
            mofu.phase = 'attack'
        }
    }


    const force = {
        x: 0,
        y: 0
    }

    if (player.isDead) {
        mofu.phase = 'sleep'
    }

    
    if (mofu.isGround) {
        mofu.v.x = 0
        // ジャンプ移動
        if (mofu.phase === 'attack') {
            if (mofu.jumpClock === 0) {
                force.x += mofu.direction === 'l' ? coef.speedX : -coef.speedX
                force.y -= coef.jump
                mofu.jumpClock = 35 + Math.round(20 * mofu.jumpInterval)
                mofu.isJump = true
                soundMofuJump(gctx, getVolumeByDistance(player, mofu), mofu.isBig)
            }
        } else mofu.isJump = false
    }

    
    if (mofu.jumpClock > 0) mofu.jumpClock -= 1



    // 重力
    force.y += coef.gravity

    moveBodi(mofu, force, gctx.state.world.stage.geo)



    // ダメージ判定

    if (mofu.isDamaging) {
        mofu.damageClock += 1
        if (mofu.damageClock === 30) {
            mofu.isDamaging = false
        }
    }
    
    gctx.state.world.bullets.map(bullet => {       
        if (isHittingRects(bullet, mofu)) {
            soundEnemyHurt(gctx)
            mofu.hp -= 1
            mofu.isDamaging = true
            mofu.damageClock = 0
            // 弾丸消滅
            gctx.state.world.bullets = gctx.state.world.bullets.filter(b => b !== bullet)
            // 死亡判定
            if (mofu.hp <= 0) {
                soundDestroyEnemy(gctx)
                newExplosion(gctx, mofu.x, mofu.y, {
                    x: bullet.v.x / 10,
                    y: bullet.v.y / 10,
                })
                if (mofu.isBig) makeCoins(gctx, mofu, [2, 2, 3, 3, 1, 1, 2])
                else makeCoins(gctx, mofu, [1, 2, 2, 3])
                gctx.state.world.mofus = gctx.state.world.mofus.filter(m => m !== mofu)
            }
        }
    })
}