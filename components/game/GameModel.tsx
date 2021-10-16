import React from "react";
import useGameResource from "../../game/resource/useGameResource";
import { GameCtx, Updater } from "../../game/GameCtx";
import { loadGameContent } from "../../game/content/GameContent";
import useGameState from "../../game/state/useGameState";
import { GameController } from "./GameController";

const gameContent = loadGameContent()

export const GameModel: React.FC<{}> = () => {
    const gameResource = useGameResource()
    const [gameState, _] = useGameState()

    function fire(updater: Updater) {
        window.dispatchEvent(new CustomEvent('custom', {
            detail: updater
        }))
    }

    const gctx: GameCtx | null = gameResource === null ? null : {
        resource: gameResource,
        content: gameContent,
        state: gameState,
        fire: fire,
    }
   
    return <>
        <GameController gctx={gctx}/>
    </>
}
