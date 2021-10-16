import { movePlayer } from "../object/player/movePlayer";
import { moveScreen } from "../object/screen";
import { moveBullets } from "../object/bullet/bullet";
import { moveMofus } from "../object/mofu/moveMofu";
import { moveExplosion } from "../object/explosion";
import { moveCoins } from "../object/coin/moveCoin";
import { moveBees } from "../object/bee/moveBee";
import { moveUfo } from "../object/ufo/moveUfo";
import { moveUfoBullets } from "../object/ufoBullet/ufoBullet";
import { moveLaser } from "../object/laser/laser";
import { GameState } from "../state/GameState";
import { GameCtx } from "../GameCtx";
import { isKeyDown } from "../input/key";
import { moveScoreIndicator } from "../object/UI/ScoreIndicator/ScoreIndicator";

export function update(gctx: GameCtx): GameState {
    if (gctx.state.isClear) {
        if (gctx.state.clearClock >= 30 * 3 && gctx.state.world.coins.length === 0) {
            if (!gctx.state.isAllClear) {
                gctx.state.isAllClear = true
                gctx.state.clearTime = Date.now()
            }
        }
        gctx.state.clearClock++
    }

    // controlDev(gctx)

    moveScreen(gctx)

    // worldの進行
    movePlayer(gctx)
    moveBullets(gctx)
    moveMofus(gctx)
    moveBees(gctx)
    moveExplosion(gctx)
    moveCoins(gctx)
    moveScoreIndicator(gctx)
    moveUfo(gctx)
    moveUfoBullets(gctx)
    moveLaser(gctx)
    

    if (!gctx.state.isClear && !gctx.state.world.player.isDead) gctx.state.tick ++

    gctx.state.input.events = []
    return gctx.state
}


// devモード関連
function controlDev(gctx: GameCtx) {
    // devモード切り替え
    if (isKeyDown(gctx, 'i')) {
        gctx.state.isDevMode = !gctx.state.isDevMode
    }
}