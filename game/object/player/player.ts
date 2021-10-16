import { Bodi, Direction2 } from "../physics/physics";

export type HeadDirection = 'f' | 't' | 'b'

export type Player = Bodi & {
    // status
    maxHp: number
    hp: number
    exp: number
    
    // flags
    level: 1 | 2 | 3
    reloadTimer: number
    direction: Direction2
    isJumping: boolean
    isInteracting: boolean
    jumpClock: number
    isWalking: boolean
    walkClock: number
    headDirection: HeadDirection
    directionClock: number
    headDirectionClock: number
    isDamaging: boolean
    damageClock: number
    isDead: boolean
    isInvisible: boolean
    deadClock: number
}

export const newPlayer = (): Player => ({
    // bodi
    x: 0,
    y: 0,
    w: 40,
    h: 60,
    v: {
        x: 0,
        y: 0
    },
    maxSpeed: {
        x: 10,
        y: 20
    },
    minSpeed: {
        x: 0,
        y: 0
    },
    drag: 1.3,

    // status
    maxHp: 3,
    hp:3,
    exp: 0,

    // flags
    level: 1,
    reloadTimer: 0,
    direction: 'r',
    isJumping: false,
    jumpClock: 0,
    isInteracting: false,
    isWalking: false,
    walkClock: 0,
    headDirection: 'f',
    headDirectionClock: 0,
    directionClock: 0,
    isDamaging: false,
    damageClock: 0,
    isDead: false,
    isInvisible: false,
    deadClock: 0,
})