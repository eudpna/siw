import { Bodi, Direction2 } from "../physics/physics";

export type Bee = Bodi & {
    hp: number,
    maxHp: number,
    clock: number
    direction: Direction2
    isDamaging: boolean
    damageClock: number
}

export function newBee(x: number, y: number) {
    const newBee: Bee = {
        x,
        y,
        w: 100,
        h: 70,
        v: {
            x: 0,
            y: 0
        },
        maxSpeed: {
            x: 11,
            y: 11
        },
        drag: 0.5,        
        hp: 9,
        maxHp: 10,
        clock: 0,
        direction: 'l',
        isDamaging: false,
        damageClock: 0,
        
    }
    return newBee
}