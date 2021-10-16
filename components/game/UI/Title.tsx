import conf from "../../../game/conf"
import { loadStage } from "../../../game/content/stage/loadStage"
import { GameCtx } from "../../../game/GameCtx"
import { startTimer } from "../../../game/object/timer"

export const Title: React.FC<{
    gctx: GameCtx
}> = (props) => {

    if (!props.gctx.state.isTitle) return null

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
            <StartBtn gctx={props.gctx} />
        </div>
        
    </>
}


const StartBtn: React.FC<{
    gctx: GameCtx
}> = (props) => {

    const color = 'white'

    return <>
        <div
            onClick={() => {
                props.gctx.fire((gctx) => {
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
                margin: 'auto',                            textAlign: 'center',
                lineHeight: conf.screen.h-40+'px',
                verticalAlign: 'middle',
                fontWeight: 'bold',
                fontSize: '1.8rem',
                zIndex: 4,
                cursor: 'pointer',
            }}
        >クリックしてスタート</div>
    </>
}