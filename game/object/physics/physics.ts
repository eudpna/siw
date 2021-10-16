export type Direction2 = 'l' | 'r'
export type Direction4 = 'l' | 'r' | 't' | 'b'

export type Vec2 = {
    x: number,
    y: number
}

export type Rect = {
    x: number
    y: number
    w: number
    h: number
}

export type Bodi = Rect & {
    v: Vec2
    minSpeed?: Vec2
    maxSpeed?: Vec2
    drag?: number
    isGround?: boolean
    isOnSlope?: boolean
    isJump?: boolean
    noCollide?: boolean
}

