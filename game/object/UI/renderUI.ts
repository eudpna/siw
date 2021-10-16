import { GameCtx } from "../../GameCtx"
import { drawImage } from "../../render/lib"

export function renderUI(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    renderMissionProgress(gctx, cctx)
    renderPlayerHP(gctx, cctx)
    renderScore(gctx, cctx)
    renderTime(gctx, cctx)
    renderGameClear(gctx, cctx)
}

function renderMissionProgress(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen

    const box = {
        x: screen.w - 30,
        y: 10,
        w: 170,
        h: 20
    }

    cctx.fillStyle = 'black'

    cctx.fillStyle = 'white'
    cctx.font = 'bold 16px sans-serif'
    cctx.textAlign = 'right'
    cctx.textBaseline = 'middle'
    const way = Math.round(120 - gctx.state.mileage / 100)

    if (gctx.state.world.player.isDead) {
        cctx.textAlign = 'right'
        cctx.fillText(`ミッション失敗。`, box.x + 11, box.y + box.h / 2)
    }
    else if (gctx.state.isAllClear) {
        cctx.textAlign = 'right'
        cctx.fillText(`ミッション完了。`, box.x + 11, box.y + box.h / 2)
    }
    else {
        if (way <= 0) return
        cctx.fillText(`標的まであと${way}m`, box.x + 11, box.y + box.h / 2)
    }
}

function renderPlayerHP(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const player = gctx.state.world.player
    const imgs = gctx.resource.imgs

    const box = {
        x: 10,
        y: 65,
        w: 200,
        h: 40
    }

    cctx.font = 'bold 16px sans-serif'
    cctx.textAlign = 'left'
    cctx.textBaseline = 'middle'
    cctx.fillText(``, box.x + 11, box.y + box.h / 2)

    const scale = 0.55
    const img = imgs['heart']

    for (let i = 0; i < player.hp; i++) {
        drawImage(cctx, {
            img: img,
            x: box.x + (i * (img.width * scale)),
            y: box.y,
            offset: {
                x: 0,
                y: 0,
            },
            w: img.width * scale,
            h: img.height * scale,
            flipH: false,
            rotate: 0,
        })
    }
}

function renderScore(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const box = {
        x: 0,
        y: 25,
        w: 200,
        h: 40
    }

    const score = ('0000' + gctx.state.score).slice(-4)

    cctx.fillStyle = 'white'
    cctx.font = 'bold 16px sans-serif'
    cctx.textAlign = 'left'
    cctx.textBaseline = 'middle'
    if (gctx.state.isAllClear) {
        cctx.fillText(`最終スコア  ${score}`, box.x + 11, box.y + box.h / 2)
    }
    else cctx.fillText(`Score  ${score}`, box.x + 11, box.y + box.h / 2)

    renderTime(gctx, cctx)
}


function renderTime(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const box = {
        x: 0,
        y: 0,
        w: 200,
        h: 40
    }

    const time = gctx.state.isAllClear ? Math.floor((gctx.state.clearTime - gctx.state.startTime) / 1000) : Math.floor((Date.now() - gctx.state.startTime) / 1000)
    const timeString = (() => {
        const m = Math.floor(time / 60)
        const s = ('00' + (time % 60)).slice(-2)
        return m + '分' + s + '秒'
    })();

    cctx.fillStyle = 'white'
    cctx.font = 'bold 16px sans-serif'
    cctx.textAlign = 'left'
    cctx.textBaseline = 'middle'
    if (gctx.state.isAllClear) {
        cctx.fillText(`クリアタイム  ${timeString}`, box.x + 11, box.y + box.h / 2)
    }
    else cctx.fillText(`Time  ${timeString}`, box.x + 11, box.y + box.h / 2)
}


export function renderGameClear(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen

    if (gctx.state.isAllClear) {
        cctx.fillStyle = 'white'
        cctx.font = 'bold 26px sans-serif'
        cctx.textAlign = 'center'
        cctx.textBaseline = 'middle'
        cctx.fillStyle = 'rgba(255,255,255,0.9)'
        cctx.fillText(`ゲームクリア`, screen.w / 2, screen.h / 2 - 30)
    }
}