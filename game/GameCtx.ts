import { GameContent } from "./content/GameContent";
import { GameResource } from "./resource/GameResource";
import { GameState } from "./state/GameState";

// GameCtxはゲーム全体の状態を持つコンテキスト
export type GameCtx = {
    resource: GameResource
    content: GameContent
    state: GameState
    fire: (updater: Updater) => void
}

export type Updater = (gctx: GameCtx) => void