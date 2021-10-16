import { GameCtx } from "../../game/GameCtx";
import conf from "../../game/conf";
import { renderLoadingScreen } from "../../game/render/renderLoadingScreen";
import { UI } from './UI/UI'
import render from "../../game/render/render";
import useCanvas from "../../lib/useCanvas";

export const GameView: React.FC<{
    gctx: GameCtx | null
}> = (props) => {
    const gctx = props.gctx
    const [canvasRef, cctx] = useCanvas()

    if (cctx !== null) {
        if (gctx !== null) render(gctx, cctx)
        else renderLoadingScreen(cctx)
    }

    return <>
        <div className="mx-auto noselect"
            style={{
                position: 'relative',
                width: conf.screen.w ,
                height: conf.screen.h
            }}
        >
        <canvas
            className="border-black mx-auto"
            ref={canvasRef}
            width={conf.screen.w}
            height={conf.screen.h}
        ></canvas>
        <UI gctx={gctx}/>
        </div>
    </>
}
