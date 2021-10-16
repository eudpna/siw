import conf from "../../../game/conf"
import { loadStage } from "../../../game/content/stage/loadStage"
import { GameCtx } from "../../../game/GameCtx"
import { startTimer, stopTimer } from "../../../game/object/timer"
import { newGameState, retry } from "../../../game/state/GameState"


export const GameOver: React.FC<{
    gctx: GameCtx
}> = (props) => {

    if (!(props.gctx.state.world.player.deadClock > 30)) return null

    const color = 'white'

    return <>
        <div
            style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                zIndex: 3,
                color: color,
                cursor: 'default',
            }}
        >
            <RetryBtn gctx={props.gctx} />
        </div>
    </>
}


const RetryBtn: React.FC<{
    gctx: GameCtx
}> = (props) => {

    const color = 'white'

    return <>
        <div
            onClick={() => {
                props.gctx.fire((gctx) => {
                    stopTimer(gctx)
                    retry(gctx)
                    gctx.state.isTitle = false
                    loadStage(gctx)                    
                    startTimer(gctx)
                })
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderColor: color,
                color: color,
                width: '100%',
                height: '100%',
                margin: 'auto', textAlign: 'center',
                paddingTop: 240,
                lineHeight: '3.2rem',
                verticalAlign: 'middle',
                fontWeight: 'bold',
                fontSize: '1.6rem',
                zIndex: 4,
                cursor: 'pointer',
            }}
        >　ミッション失敗…。<br />リトライ？</div>
    </>
}