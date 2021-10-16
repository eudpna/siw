import { getRandomInt } from "../../content/stage/makeEnemys";
import { Bodi, Direction2 } from "../physics/physics";


export type MofuPhase = 'sleep' | 'awake' | 'attack'

export type Mofu = Bodi & {
    // status
    hp: number,
    maxHp: number,
    jumpInterval: number,
    isBig: boolean,

    // flags
    phase: MofuPhase
    direction: Direction2
    jumpClock: number
    isDamaging: boolean
    damageClock: number
    isAwake: boolean
}

export function newMofu(x: number, y: number, isBig: boolean) {
    const newMofu: Mofu = {
        // bodi
        x,
        y,
        w: isBig ? 90 : 60,
        h: isBig ? 70 : 60,
        v: {
            x: 0,
            y: 0
        },
        isBig,

        // status
        hp: isBig ? 9 : 3,
        maxHp: 10,
        jumpInterval: Math.random(),

        // flags
        phase: 'sleep',
        direction: 'l',
        jumpClock: 0,
        isDamaging: false,
        damageClock: 0,
        isAwake: !!getRandomInt(0, 1)
    }
    return newMofu
}