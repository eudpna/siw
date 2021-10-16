import { useEffect, useState } from "react";
import { GameState, newGameState } from "./GameState";


const useGameState = (): [GameState, () => void] => {
    const [state, setstate] = useState<{
        gameState: GameState
    }>({
        gameState: newGameState()
    });

    const setGameState = () => {
        setstate(state => {
            return {
                ...state,
            }
        })
    }

    return [state.gameState, setGameState]
}

export default useGameState