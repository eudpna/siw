import { spawnBullet } from "../bullet/bullet";
import { moveBodi } from "../physics/bodi/moveBodi";
import { damagePlayer } from "./damagePlayer";
import { isHittingRects } from "../physics/rect/isHittingRects";
import { soundCoinGet, soundPlayerJump, soundPlayerWalk } from "../../sound/sound";
import { GameCtx } from "../../GameCtx";
import { isKeyDown } from "../../input/key";
import { setScoreIndicator, setScoreIndicatorLevelup } from "../UI/ScoreIndicator/ScoreIndicator";

const coef = {
    walk: 3,
    walkAir: 1,
    gravity: 1.6,
    jump: [16, 2, 2, 2, 2, 2, 1, 1]
}

export function movePlayer(gctx: GameCtx) {
    const player = gctx.state.world.player

    if (player.isDead) {
        player.deadClock ++
        return
    }
    


    // 毎フレームの処理
    if (player.isJumping) player.jumpClock += 1
    
    // どちらかが押されていれば歩行している
    if (!isKeyDown(gctx, 'left') && !isKeyDown(gctx, 'right')) {
        player.isWalking = false
        player.walkClock = 0
    } else {
        player.isWalking = true
    }

    if (player.isWalking && player.isGround) {
        
        if (player.walkClock === 0 || player.walkClock % 6 === 4) {
            soundPlayerWalk(gctx)
        }
        player.walkClock += 1
    }

    // 頭の向き
    if (isKeyDown(gctx, 'up')) {
        player.headDirection = 't'
    } else if (isKeyDown(gctx, 'down')) {
        player.headDirection = 'b'
    } else {
        player.headDirection = 'f'
    }

    // 加速
 
    let forceX = 0
    // 両方押されていたら加速なし
    if (isKeyDown(gctx, 'left') && isKeyDown(gctx, 'right')) {

    } else {
        forceX -= isKeyDown(gctx, 'left') ? (player.isGround ? coef.walk : coef.walkAir) : 0
        forceX += isKeyDown(gctx, 'right') ? (player.isGround ? coef.walk : coef.walkAir) : 0
    }


    let forceY = 0
    
    // ジャンプ
    if (player.isGround) {
        player.isJumping = false
        player.isJump = false
        player.jumpClock = 0
        if (isKeyDown(gctx, 'z')) {
            player.isJumping = true
            player.isJump = true
            soundPlayerJump(gctx)
        }
    }
    if (player.isJumping) {
        if (isKeyDown(gctx, 'z')) {
            if (player.jumpClock < coef.jump.length) forceY -= coef.jump[player.jumpClock]
        }
    }

    // 重力
    forceY += coef.gravity

    const force = {
        x: forceX,
        y: forceY
    }

    const changeDirectionByKeyDown = () => {
        if (isKeyDown(gctx, 'left')) player.direction = 'l'
        if (isKeyDown(gctx, 'right')) player.direction = 'r'
    }

    const changeDirectionByKey = () => {
        if (isKeyDown(gctx, 'left')) player.direction = 'l'
        if (isKeyDown(gctx, 'right')) player.direction = 'r'
    }

    
    const nodrag = (() => {
        // 両方押されていたら慣性あり
        if (isKeyDown(gctx, 'left') && isKeyDown(gctx, 'right')) {
            changeDirectionByKeyDown()
            return false
        }
        // どちらも押されていなかったら慣性あり
        if (!isKeyDown(gctx, 'left') && !isKeyDown(gctx, 'right')) return false
        // 片方が押されているときは慣性なし
        changeDirectionByKey()
        return true
    })();

    let tmp = player.isGround

    moveBodi(player, force, gctx.state.world.stage.geo, nodrag)

    if (!tmp && player.isGround) {
        soundPlayerWalk(gctx)
    }

    // 弾丸を発射
    if (player.level === 1) {
        if (isKeyDown(gctx, 'x') && player.reloadTimer === 0) {
            spawnBullet(gctx, player.headDirection)
            player.reloadTimer = 6
        }
    } else if (player.level === 2) {
        if (isKeyDown(gctx, 'x') && player.reloadTimer === 0) {
            spawnBullet(gctx, player.headDirection)
            player.reloadTimer = 5
        }
    } else {
        if (isKeyDown(gctx, 'x') && player.reloadTimer === 0) {
            spawnBullet(gctx, player.headDirection)
            player.reloadTimer = 4
        }
    }
   
    if (player.reloadTimer > 0) {
        player.reloadTimer -= 1
    }

    // スクリーンアニメーション用
    if (player.directionClock < 30 && player.direction === 'r') {
        player.directionClock += 1
    } else if (player.directionClock > -30 && player.direction === 'l') {
        player.directionClock -= 1
    }

    if (player.headDirectionClock > -30 && player.headDirection === 't')  {
        player.headDirectionClock -= 1
    } else if (player.headDirectionClock < 30 && player.headDirection === 'b') {
        player.headDirectionClock += 1
    } else {
        if (player.headDirectionClock > 0) player.headDirectionClock -= 1
        else if (player.headDirectionClock < 0) player.headDirectionClock += 1
    }

    if (player.x > gctx.state.mileage) gctx.state.mileage = player.x

    // ダメージ
    damagePlayer(gctx)

    getCoins(gctx)
}


export function getCoins(gctx: GameCtx) {
    const player = gctx.state.world.player
    const coins = gctx.state.world.coins
    gctx.state.world.coins = coins.filter(coin => {
        if (isHittingRects(coin, player)) {
            soundCoinGet(gctx)
            gctx.state.score += coin.score
            player.exp += coin.score
            setScoreIndicator(gctx, coin.score)
            if (player.level === 1 && player.exp > 40) levelUp(gctx)
            else if (player.level === 2 && player.exp > 100) levelUp(gctx)
            return false

        }
        return true
    })
}

export function levelUp(gctx: GameCtx) {
    const player = gctx.state.world.player
    if (player.level === 3) return
    if (gctx.state.isClear) return
    player.level ++
    setScoreIndicatorLevelup(gctx)
}
