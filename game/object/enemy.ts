import { Bodi, Direction2 } from "./physics/physics";

export type Enemy = {
    b: Bodi,
    hp: number,
    maxHp: number,
    flag: {
        direction: Direction2
        jumpClock: number
        isDamaging: boolean
        damageClock: number
    }
}