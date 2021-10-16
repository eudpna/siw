import { useEffect, useState } from "react";
import { loadGameResource } from "./loadGameResource";
import { GameResource } from "./GameResource";

const useGameResource = (): GameResource | null => {
    const [state, setstate] = useState<{
        gameResource: GameResource | null
    }>({
        gameResource: null
    });

    async function load() {
        const gameResource = await loadGameResource()
        setstate(state => ({
            ...state,
            gameResource: gameResource
        }))
    }

    useEffect(() => {
        load()
    }, []);

    return state.gameResource
}

export default useGameResource