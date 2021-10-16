import { GameCtx } from "../../../GameCtx"
import { soundPlayerLevelUp } from "../../../sound/sound"

export type ScoreIndicator = {
    score: number
    clock: number
    is: boolean
    isLevelup: boolean
}

export function newScoreIndicator(): ScoreIndicator {
    return {
        score: 0,
        clock: 0,
        is: false,
        isLevelup: false,
    }
}

export function moveScoreIndicator(gctx: GameCtx) {
    const si = gctx.state.scoreIndicator
    if (!si.is) return
    si.clock ++
    if (si.clock > 30) {
        si.is = false
        si.isLevelup = false
    }
}

export function renderScoreIndicator(gctx: GameCtx, cctx: CanvasRenderingContext2D) {
    const si = gctx.state.scoreIndicator
    const player = gctx.state.world.player
    const screen = gctx.state.world.screen
    const x = player.x + player.w/2 - screen.x
    const y = player.y - 20 - screen.y - si.clock * 2
    
    if (!si.is) return
    if (si.clock > 30) return

    cctx.fillStyle = 'rgb(255, 185, 103)'
    cctx.fillStyle = 'rgb(234, 115, 33)'
    cctx.fillStyle = '#ff9a54'
    cctx.font = 'bold 30px sans-serif'
    cctx.textAlign = 'center'
    cctx.textBaseline = 'middle'

    if (!si.isLevelup) {
        cctx.globalAlpha = (30 - si.clock) / 30
        cctx.fillText(`+${si.score}`, x, y)
        cctx.globalAlpha = 1
    }
    
    if (si.isLevelup) {
        if (si.clock % 2 === 0) {
            cctx.font = 'bold 24px sans-serif'
            const y = player.y - 20 - screen.y - 25
            cctx.fillText(`レベルアップ`+'！！！'.slice(0, player.level-1), x, y)
        }
    }
    cctx.globalAlpha = 1
}

export function setScoreIndicator(gctx: GameCtx, score: number) {
    const si = gctx.state.scoreIndicator
    if (si.isLevelup) return
    si.score = score
    si.clock = 0
    si.is = true
}

export function setScoreIndicatorLevelup(gctx: GameCtx) {
    const si = gctx.state.scoreIndicator
    si.isLevelup = true
    si.clock = 0
    si.is = true
    soundPlayerLevelUp(gctx)
}
