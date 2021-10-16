import { makeCoins } from "../coin/coin"
import { getRandomInt } from "../../content/stage/makeEnemys"
import { newExplosion } from "../explosion"
import { moveBodi } from "../physics/bodi/moveBodi"
import { angleToVec } from "../physics/math"
import { Vec2 } from "../physics/physics"
import { isHittingRects } from "../physics/rect/isHittingRects"
import { getVolumeByDistance, soundEnemyHurt, soundLaser, soundUfoExplodeBig, soundUfoExplodeSmall, soundUfoShot, soundUfoShotShort } from "../../sound/sound"

import { makeLaser } from "../laser/laser"
import { UfoBullet } from "../ufoBullet/ufoBullet"
import { GameCtx } from "../../GameCtx"

export const explodeDelay = 60

export function moveUfo(gctx: GameCtx) {
    const ufo = gctx.state.world.ufo
    const player = gctx.state.world.player
    if (ufo === null) return

    // 遠くにいるときは動かない
    if (ufo.x - player.x > 3000) return

    if (ufo.isDead) {
        gctx.state.isClear = true
        ufo.deadClock++
        ufo.damageClock = 1
        ufo.v.x *= 0.1
        ufo.v.y *= 0.1

        if (ufo.deadClock === explodeDelay) {
            soundUfoExplodeBig(gctx)
            makeCoins(gctx, {
                x: ufo.x + ufo.w / 2,
                y: ufo.y + 20
            }, [1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4])
            gctx.state.world.bees = []
            gctx.state.world.mofus = []
        }


        if (ufo.deadClock < explodeDelay && ufo.deadClock % 5 === 0) {
           
            soundUfoExplodeSmall(gctx)
            newExplosion(gctx, ufo.x + ufo.w / 2 + getRandomInt(-ufo.w/2, ufo.w/2), ufo.y + ufo.h/2 + getRandomInt(-ufo.h/2, ufo.w/2), {x:0, y:0})
        }

        return
    }

    ufo.clock ++

    const force = {
        x: 0,
        y: 0
    }
    if (ufo.phase === 1) {
        force.x += ((ufo.direction === 'l' ? -1 : 1) * 0.5)

    if (ufo.moveClock % 125 === 0) {
        // 向き決定
        if (ufo.x < player.x) {
            ufo.direction = 'r'
        } else {
            ufo.direction = 'l'
        }
    }

    // 波状攻撃
    if (ufo.moveClock % 125 === 25 || ufo.moveClock % 125 === 50) {
        soundUfoShot(gctx, getVolumeByDistance(player, ufo))
        const n = 8
        const p = {
            x: (player.x + player.v.x * 30) - (ufo.x + ufo.w / 2),
            y: (player.y + player.v.y * 30) - (ufo.y + 40)
        }
        const a = Math.atan2(p.y, p.x) - (Math.PI / 2)
        for (let i = 0; i < n; i++) {
            makeUfoBullet(gctx, {
                x: ufo.x + ufo.w / 2,
                y: ufo.y + 40
            }, a +
            ((Math.PI / n) * i + (Math.PI / n) / 2), 10)
        }
    }
    let tmp = ufo.moveClock % 125

    if (tmp >= 100 && tmp <= 125 && ufo.moveClock % 5 === 0) {
        soundUfoShotShort(gctx, getVolumeByDistance(player, ufo))
        const p = {
            x: (player.x + player.v.x * (30*5) * (tmp-100) / 25) - (ufo.x + ufo.w / 2),
            y: (player.y + player.v.y * 30) - (ufo.y + 40)
        }
        const a = Math.atan2(p.y, p.x)
        makeUfoBullet(gctx, {
            x: ufo.x + ufo.w / 2,
            y: ufo.y + 40
        }, a, 15)
    }

    // レーザー狙い
    if (ufo.moveClock > 270) {
        if (Math.abs(ufo.x - player.x) < 30) {
            ufo.moveClock = 0
            ufo.phase = 2
        }
    }
    }

    if (ufo.phase === 2) {
        ufo.v.x *= 0.9
        if (ufo.moveClock === 25) {
            makeLaser(gctx, ufo.x + 50, ufo.y + 50)
            ufo.phase = 3
            ufo.moveClock = 0
        }
    }

    //  phase3 待機
    if (ufo.phase === 3) {
        if (ufo.moveClock === 100) {
            ufo.moveClock = 0
            ufo.phase = 1
            // 向き決定
            if (ufo.x < player.x) {
                ufo.direction = 'r'
            } else {
                ufo.direction = 'l'
            }
        }
    }


    // Y move
    if ((ufo.phase === 2.1 || ufo.phase === 3)) {
        const targetY = player.y - 550
        force.y += (targetY - ufo.y) * 0.001
        ufo.v.y = ufo.v.y * 0.1
    } else {
        const targetY = player.y - 550

        force.y += (targetY - ufo.y) * 0.01
    }
    

    moveBodi(ufo, force, gctx.state.world.stage.geo)

    // ダメージ判定

    if (ufo.isDamaging) {
        ufo.damageClock += 1
        if (ufo.damageClock === 30) {
            ufo.isDamaging = false
        }
    }
    
    gctx.state.world.bullets.map(bullet => {       
        if (isHittingRects(bullet, ufo)) {
            soundEnemyHurt(gctx)
            ufo.hp -= 1
            ufo.isDamaging = true
            ufo.damageClock = 0
            // 弾丸消滅
            gctx.state.world.bullets = gctx.state.world.bullets.filter(b => b !== bullet)
            // 死亡判定
            if (ufo.hp <= 0) {
                ufo.hp = 0
                ufo.isDead = true    
                gctx.state.world.laser = null
                gctx.state.world.ufoBullets = []
            }
        }
    })

    ufo.moveClock ++
}

function makeUfoBullet(gctx: GameCtx, p: Vec2, a: number, speed = 11) {
    
    const newBullet: UfoBullet = {
        x: p.x,
        y: p.y,
        v: {
            x: angleToVec(a).x * speed,
            y: angleToVec(a).y * speed,
        },
        w: 30,
        h: 30,
        lifeClock: 30 * 50
    }
    const bullets = gctx.state.world.ufoBullets
    bullets.push(newBullet)
}

