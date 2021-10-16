import { Bodi, Direction2 } from "../physics/physics"

export type UfoPhase = number

export type Ufo = Bodi & {
    // status
    hp: number,
    maxHp : number

    // flags
    phase: UfoPhase
    clock: number
    isDead: boolean
    deadClock: number
    direction: Direction2
    isDamaging: boolean
    damageClock: number
    moveClock: number

}

export function newUfo(x: number, y: number) {
    const newUfo: Ufo = {
        // bodi
        x,
        y,
        w: 180,
        h: 100,
        v: {
            x: 0,
            y: 0
        },
        maxSpeed: {
            x: 8,
            y: 5
        },
        drag: 0.3,

        // status
        hp: 100,
        maxHp: 100,

        // flags
        clock: 0,
        isDead: false,
        deadClock: 0,
        direction: 'l',
        phase: 1,
        isDamaging: false,
        damageClock: 0,
        moveClock: 0
    }
    return newUfo
}