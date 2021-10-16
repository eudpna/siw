import { makeGrasses } from "../../object/grass";
import { newBee } from "../../object/bee/bee";
import { newMofu } from "../../object/mofu/mofu";
import { newUfo } from "../../object/ufo/ufo";
import { GameCtx } from "../../GameCtx";

export function loadStage(gctx: GameCtx): void {
    const stage = gctx.content.stage
    gctx.state.world.stage = stage
    const player = gctx.state.world.player
    const screen = gctx.state.world.screen
    player.x = stage.player.x
    player.y = stage.player.y

    // 敵をスポーン
    gctx.state.world.mofus =
    stage.enemys
    .filter(enemy => enemy.kind === 'mofu')
    .map(enemy => {
        if (enemy.isBig) return newMofu(enemy.x, enemy.y, enemy.isBig)
        else return newMofu(enemy.x, enemy.y, false)
    })

    gctx.state.world.bees =
        stage.enemys
            .filter(enemy => enemy.kind === 'bee')
            .map(enemy => {
                return newBee(enemy.x, enemy.y)
            })

    // ufoをスポーン
    gctx.state.world.ufo = newUfo(15000, player.y - 400)

    // 弾丸全て消去
    gctx.state.world.bullets = []
    gctx.state.world.ufoBullets = []

    // スクリーン位置調整
    screen.x = player.x - screen.w / 2
    screen.y = player.y - screen.h / 2

    makeGrasses(gctx)

    gctx.state.startTime = Date.now()
}
