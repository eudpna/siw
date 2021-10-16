import conf from "../conf"
import { newStage, Stage } from "../content/stage/stage"
import { GameCtx } from "../GameCtx"
import { Bee } from "../object/bee/bee"
import { Bullet } from "../object/bullet/bullet"
import { Coin } from "../object/coin/coin"
import { Explosion } from "../object/explosion"
import { Grass } from "../object/grass"
import { Input, newInput } from "../input/input"
import { Laser } from "../object/laser/laser"
import { Mofu } from "../object/mofu/mofu"
import { newPlayer, Player } from "../object/player/player"
import { newScreen, Screen } from "../object/screen"
import { newTimer, Timer } from "../object/timer"
import { Ufo } from "../object/ufo/ufo"
import { UfoBullet } from "../object/ufoBullet/ufoBullet"
import { newScoreIndicator, ScoreIndicator } from "../object/UI/ScoreIndicator/ScoreIndicator"

export type GameState = {
    timer: Timer
    input: Input
    startTime: number
    clearTime: number
    isTitle: boolean
    mileage: number
    isDevMode: boolean
    soundVolume: number,
    isClear: boolean,
    isAllClear: boolean,
    clearClock: number,
    tick: number,
    score: number,
    world: {
        stage: Stage,
        screen: Screen
        player: Player
        bullets: Bullet[]
        mofus: Mofu[]
        bees: Bee[],
        explosions: Explosion[]
        coins: Coin[]
        grasses: Grass[]
        ufo: Ufo | null,
        ufoBullets: UfoBullet[]
        laser: Laser | null
    },
    scoreIndicator: ScoreIndicator
}


export function newGameState(): GameState {
    return {
        timer: newTimer(conf.fps),
        input: newInput(),
        startTime: 0,
        clearTime: 0,
        isTitle: true,
        isDevMode: false,
        soundVolume: 1,
        isClear: false,
        isAllClear: false,
        mileage: 0,
        clearClock: 0,
        tick: 0,
        score: 0,
        world: {
            stage: newStage(),
            screen: newScreen(),
            player: newPlayer(),
            bullets: [],
            mofus: [],
            bees: [],
            coins: [],
            explosions: [],
            grasses: [],
            ufo: null,
            ufoBullets: [],
            laser: null,
        },
        scoreIndicator: newScoreIndicator(),
    }
}

export function retry(gctx: GameCtx) {
    const state = gctx.state
    state.isTitle = true,
    state.isDevMode = false,
    state.startTime = 0,
    state.clearTime = 0,
    state.soundVolume = 1,
    state.isClear = false,
    state.isAllClear = false,
    state.mileage = 0,
    state.clearClock = 0,
    state.tick = 0,
    state.score = 0,
    state.world = {
        stage: newStage(),
        screen: newScreen(),
        player: newPlayer(),
        bullets: [],
        mofus: [],
        bees: [],
        coins: [],
        explosions: [],
        grasses: [],
        ufo: null,
        ufoBullets: [],
        laser: null,
    }
    state.scoreIndicator = newScoreIndicator()
}