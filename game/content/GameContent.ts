import { newStage, Stage } from "./stage/stage"

export type GameContent = {
    stage: Stage
}

export function loadGameContent(): GameContent {
    return {
        stage: newStage()
    }
}