import { GameCtx } from "../../GameCtx"
import { drawImage } from "../../render/lib"


export function renderPlayer(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const player = gctx.state.world.player
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs

    if (player.isDead ) return

    if (player.isDamaging) {
        if (Math.floor(player.damageClock / 3) % 2 === 0) return
    }

    if (player.isInvisible) return

    let img = imgs['player0']
    let scale = 1

    renderGun(gctx, cctx)

    // 体を表示
    img = (() => {
        if (player.isJumping) {
            return imgs['body-jump']
        }
        if (!player.isWalking) return imgs['stop']
        if (!player.isGround) return imgs['body-jump']
        player.isWalking
        let tmp = Math.floor(player.walkClock / 3) % 4
        switch (tmp) {
            case 0: {
                return imgs['walk0']
                break
            }
            case 1: {
                return imgs['walk1']
                break
            }
            case 2: {
                return imgs['walk2']
                break
            }
            case 3: {
                return imgs['walk1']
                break
            }
        }
        return imgs['stop']
    })();
    scale = 0.6
    let offsetY = 20
    drawImage(cctx, {
        img: img,
        x: player.x - screen.x - 10,
        y: player.y - screen.y + offsetY,
        offset: {
            x: 0,
            y: 0,
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: player.direction === 'l',
        rotate: 0,
    })

    // 頭部を表示
    img = (() => {
        if (player.isInteracting) return imgs['head-back']
        switch (player.headDirection) {
            case 'f': {
                return imgs['head']
            }
            case 't': {
                return imgs['head-t']
            }
            case 'b': {
                return imgs['head-b']
            }
        }
    })()
    scale = 0.6;
    let offsetX = player.direction === 'l' ? -14 : -30
    drawImage(cctx, {
        img: img,
        x: player.x - screen.x +offsetX - 10,
        y: player.y - screen.y - 55 + offsetY,
        offset: {
            x: 0,
            y: 0,
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: player.direction === 'l',
        rotate: 0,
    })
    
}

export function renderGun(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const player = gctx.state.world.player
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs

    const img = imgs['gun']
    const scale = 0.9

    let offsetY = 13
    let offsetX = player.direction === 'l' ? -12 : -17
     let rotate = 0

    if (player.headDirection === 't') {
        offsetY = player.direction === 'l' ? 4 : 98
        offsetX = player.direction === 'l' ? 51 : 12
        rotate = player.direction === 'l' ? 90 : -90
    }


    if (player.headDirection === 'b') {
        offsetY = player.direction === 'l' ? 74 : 
        -20
        offsetX = player.direction === 'l' ? -10 : 72
        rotate = player.direction === 'l' ? -90 : 90
    }
    
    drawImage(cctx, {
        img: img,
        x: player.x - screen.x + offsetX - 10,
        y: player.y - screen.y + offsetY,
        offset: {
            x: 0,
            y: 0,
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: player.direction === 'l',
        rotate: rotate,
    })
}
