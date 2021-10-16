import { Vec2 } from "./physics"


export const addVec2 = (v1: Vec2, v2: Vec2) => {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y
    }
}

export const restrict = (n: number, min: number, max: number) => {
    if (n > max) return max
    if (n < min) return min
    return n
}

export const getDistance = (v1: Vec2, v2: Vec2) => {
    return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2))
}


export function restrictVec2(v: Vec2, minSpeed?: number, maxSpeed?: number): Vec2 {
    const d = Math.sqrt(((v.x) * (v.x) + (v.y * v.y)))
    if (minSpeed !== undefined && d < minSpeed) {
        return {
            x: v.x / d * minSpeed,
            y: v.y / d * minSpeed
        }
    }
    if (maxSpeed !== undefined && d > maxSpeed) {
        return {
            x: v.x / d * maxSpeed,
            y: v.y / d * maxSpeed
        }
    }
    return {
        x: v.x,
        y: v.y
    }
}

export function angleToVec(a: number) {
    return {
        x: Math.cos(a),
        y: Math.sin(a)
    }
}