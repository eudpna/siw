import { useEffect, useState } from "react";
import { GameCtx } from "../../game/GameCtx";
import { catchCustomEvent } from "../../game/event/catchCustomEvent";
import { listenInputs } from "../../game/input/input";
import { GameView } from "./GameView";

export const GameController: React.FC<{
    gctx: GameCtx | null
}> = (props) => {

    const [_, setState] = useState<{}>({})
    function rerender() {
        setState(state => ({...state}))
    }

    useEffect(() => {
        if (props.gctx === null) return
        
        window.addEventListener('custom', e => {
            catchCustomEvent(props.gctx!, e as CustomEvent)
            rerender()
        })

        listenInputs(props.gctx)
    }, [props.gctx === null]);

    return <>
        <GameView gctx={props.gctx}/>
    </>
}
