import { getDistance } from "../object/physics/math";
import { Vec2 } from "../object/physics/physics";
import { Howl } from 'howler'
import { GameCtx } from "../GameCtx";

export function soundShot(gctx: GameCtx, volume: number = 1) {
    if (gctx.state.isTitle) return
    const audios = gctx.resource.audios
    const audio = audios['player-shot']
    audio.volume(volume * 0.6)
    audio.play()
}

export function soundCoinBounce(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['xp-bounce']
    audio.volume(volume*0.3)
    audio.play()
}

export function soundCoinGet(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['xp-get']
    // audio.volume(0.1)
    audio.volume(volume * 0.8)
    audio.play()
}

export function soundEnemyHurt(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['enemy-damage']
    audio.volume(volume*0.5)
    audio.play()
}


export function soundDestroyEnemy(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['enemy-destroy']
    audio.volume(volume)
    audio.play()
}

export function soundMofuJump(gctx: GameCtx, volume: number = 1, isBig = false) {
    const audio = new Howl({
        src: [isBig ? '/audios/nyaw/jump-big.mp3' : '/audios/nyaw/jump-small.mp3']
    });
    audio.volume(volume * 0.4)
    audio.play()
}

export function soundPlayerJump(gctx: GameCtx, volume: number = 1) {
    if (gctx.state.isTitle) return
    const audios = gctx.resource.audios
    const audio = audios['player-jump']
    audio.volume(volume)
    audio.play()
}

export function soundPlayerDamage(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['player-damage']
    audio.volume(volume)
    audio.play()
}

export function soundPlayerWalk(gctx: GameCtx, volume: number = 1) {
    if (gctx.state.isTitle) return
    const audios = gctx.resource.audios
    const audio = audios['player-walk']
    audio.volume(volume * 0.5)
    audio.play()
}


export function soundBee(gctx: GameCtx, volume: number = 1) {
    const audio = new Howl({
        src: ['/audios/nyaw-new/bee.mp3']
    });
    audio.volume(volume * 0.7)
    audio.play()
}

export function soundPlayerDie(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['player-die']
    audio.volume(volume)
    audio.play()
}

export function soundPlayerLevelUp(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['player-levelup']
    audio.volume(volume)
    audio.play()
}

export function soundUfoExplodeSmall(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['explosion-small']
    audio.volume(volume)
    audio.play()
}

export function soundUfoExplodeBig(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['explosion-big']
    audio.volume(volume)
    audio.play()
}

export function soundUfoShot(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['ufo-shot']
    audio.volume(volume)
    audio.play()
}

export function soundUfoShotShort(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['ufo-shot-short']
    audio.volume(volume)
    audio.play()
}

export function soundLaser(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['laser']
    audio.volume(volume * 0.4)
    audio.rate(0.9)
    audio.play()
}

export function soundUfo(gctx: GameCtx, volume: number = 1) {
    const audios = gctx.resource.audios
    const audio = audios['ufo']
    const ufo = gctx.state.world.ufo
    const player = gctx.state.world.player

    if (ufo === null || ufo.isDead) {
        audio.volume(0)
    } else {
        if (ufo.clock % 10 === 0) {
            audio.volume(getVolumeByDistance(ufo, player) * 0.7)
        }
        if (ufo.clock === 3) {
            if (!audio.playing()) audio.play()
            audio.on('end', () => {
                if (!audio.playing()) audio.play()
            })
        }
    }
}



export function getVolumeByDistance(p1: Vec2, p2: Vec2) {
    const d = getDistance(p1, p2)
    const c = 1500
    if (d > c) return 0
    return (c - d) / c
}