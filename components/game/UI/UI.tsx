import React from "react"
import { GameCtx } from "../../../game/GameCtx"
import { GameOver } from "./GameOver"
import { Title } from "./Title"


export const UI: React.FC<{
    gctx: GameCtx | null
}> = (props) => {
    if (props.gctx === null) return null
    return <>
        <Title gctx={props.gctx} />
        <GameOver gctx={props.gctx} />
    </>
}