import { makeCoins, newCoin } from "../coin/coin"
import { moveBodi } from "../physics/bodi/moveBodi"
import { getDistance, restrictVec2 } from "../physics/math"
import { isHittingRects } from "../physics/rect/isHittingRects"
import { getVolumeByDistance, soundBee, soundDestroyEnemy, soundEnemyHurt } from "../../sound/sound"
import { newExplosion } from "../explosion"
import { Bee } from "./bee"
import { GameCtx } from "../../GameCtx"

const coef = {   
    speedX: 3,
    jump: 25,
    gravity: 1.6,
}

export function moveBees(gctx: GameCtx) {
    const screen = gctx.state.world.screen
    gctx.state.world.bees.filter(p => getDistance(p, screen) < 3000).map(bee => moveBee(gctx, bee))
}

export function moveBee(gctx: GameCtx, bee: Bee) {
    const player = gctx.state.world.player

    bee.clock++

    // 常にプレイヤーの方を向く    
    if (bee.x < player.x) {
        bee.direction = 'l'
    } else {
        bee.direction = 'r'
    }
  
    const force = {
        x: 0,
        y: 0
    }

    if (bee.clock % 3 === 1 && !player.isDead) {
        soundBee(gctx, getVolumeByDistance(bee, player))
    }

    // 飛行
    force.y -= 1.6

    const tmp = Math.floor(bee.clock / (30 * 3)) % 3

    if (player.isDead || tmp !== 2) {
        bee.maxSpeed = {
            x: 9,
            y: 9
        }       
        force.x += normalize((player.x - bee.x)) * 0.5
        force.y += normalize(((player.y - 150) - bee.y)) * 0.2
    } else {
        bee.maxSpeed = {
            x: 11,
            y: 11
        }
        force.x += normalize((player.x - bee.x))
        force.y += normalize((player.y - bee.y))
        
        force.x += bee.v.x / 20
    }

    // 重力
    force.y += coef.gravity

    moveBodi(bee, force, gctx.state.world.stage.geo)

    // ダメージ判定

    if (bee.isDamaging) {
        bee.damageClock += 1
        if (bee.damageClock === 30) {
            bee.isDamaging = false
        }
    }
    
    gctx.state.world.bullets.map(bullet => {       
        if (isHittingRects(bullet, bee)) {
            soundEnemyHurt(gctx)
            bee.hp -= 1
            bee.isDamaging = true
            bee.damageClock = 0
            // 弾丸消滅
            gctx.state.world.bullets = gctx.state.world.bullets.filter(b => b !== bullet)
            // 死亡判定
            if (bee.hp <= 0) {
                soundDestroyEnemy(gctx)
                newExplosion(gctx, bee.x, bee.y, {
                    x: bullet.v.x / 10,
                    y: bullet.v.y / 10,
                })
                makeCoins(gctx, bee, [1, 1, 1, 2, 2, 3])
                gctx.state.world.bees = gctx.state.world.bees.filter(m => m !== bee)
            }
        }
    })
}

export function normalize(n: number) {
    if (n < 0) return -1
    else return 1
}