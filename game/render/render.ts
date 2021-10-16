import { renderBullets } from '../object/bullet/renderBullets'
import { renderMofus } from '../object/mofu/renderMofu'
import { renderDev } from './renderDev'
import { renderExplosions } from '../object/explosion'
import { renderCoins } from '../object/coin/renderCoin'
import { renderBees } from '../object/bee/renderBee'
import { renderGrasses } from '../object/grass'
import { renderLastExplosion, renderUfo, } from '../object/ufo/renderUfo'
import { renderUfoBullets } from '../object/ufoBullet/renderUfoBullets'
import { renderLaser } from '../object/laser/renderLaser'
import { soundUfo } from '../sound/sound'
import { GameCtx } from '../GameCtx'
import { renderPlayer } from '../object/player/renderPlayer'
import { renderGeos, renderStage } from '../content/stage/renderStage'
import { renderScoreIndicator } from '../object/UI/ScoreIndicator/ScoreIndicator'
import { renderUI } from '../object/UI/renderUI'

export default function render(gctx: GameCtx, cctx: CanvasRenderingContext2D) {
    // canvasを真っ白にリセット
    cctx.fillStyle = 'white'
    cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height)
    const scale = gctx.state.world.screen.scale
    
    cctx.save()
    cctx.scale(scale, scale);
    
    renderStage(gctx, cctx)
    
    if (!gctx.state.isTitle) {
        renderLaser(gctx, cctx)
        renderPlayer(gctx, cctx)
        renderBullets(gctx, cctx)
        renderMofus(gctx, cctx)
        renderBees(gctx, cctx)
        renderCoins(gctx, cctx)
        renderGrasses(gctx, cctx)
        renderUfo(gctx, cctx)
        renderUfoBullets(gctx, cctx)
        renderExplosions(gctx, cctx)
        renderGeos(gctx, cctx)
        renderScoreIndicator(gctx, cctx)
    }
    
    renderDev(gctx, cctx)
    
    cctx.restore()
    
    if (!gctx.state.isTitle) {
        renderUI(gctx, cctx)
        renderLastExplosion(gctx, cctx)
    }

    // sound
    soundUfo(gctx)

    // border
    cctx.strokeStyle = 'black'
    cctx.lineWidth = 3
    cctx.strokeRect(0, 0, cctx.canvas.width, cctx.canvas.height)
} 
