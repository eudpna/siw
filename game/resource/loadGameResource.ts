import { GameResource } from "./GameResource";
import loadAudios from "./loadAudios";
// import { loadConf } from "./loadConf";
import loadImages from "./loadImages";

export async function loadGameResource(): Promise<GameResource> {
    return {
        imgs: await loadImages(),
        audios: await loadAudios(),
    }
}