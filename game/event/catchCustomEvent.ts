import { GameCtx, Updater } from "../GameCtx";
import { GameState } from "../state/GameState";

export function catchCustomEvent(gctx: GameCtx, e: CustomEvent): GameState {
    (e.detail as Updater)(gctx);

    return gctx.state
}