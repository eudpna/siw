import { Bodi, Direction4, Rect, Vec2 } from "../physics";
import { isHittingRects } from "../rect/isHittingRects";



export function collideBodiWithBlock1(b: Bodi, block: Rect, check: Direction4[] = ['b', 'l', 'r', 't']): Direction4[] {

    let flag: Direction4[] = [];

    if (!isHittingRects(b, block)) return []


    // 右にめりこんでいる場合
    if (
        check.includes('r') &&
        b.x < block.x
    ) {
        b.x = block.x - b.w
        flag.push('r')
    }

    // 左にめりこんでいる場合
    if (
        check.includes('l') &&
        b.x > block.x
    ) {
        b.x = block.x + block.w
        flag.push('l')
    }

    // 下にめりこんでいる場合
    if (
        check.includes('b') &&
        b.y < block.y
    ) {
        b.y = block.y - b.h
        b.isGround = true
        flag.push('b')
    } else {
        b.isGround = false
    }

    // 上にめりこんでいる場合
    if (
        check.includes('t') &&
        b.y > block.y
    ) {
        b.y = block.y + block.h
        flag.push('t')
    }

    return flag
}

export function collideBodiWithBlock(b: Bodi, block: Rect): Direction4[] {
    
    let flag: Direction4[] = [];

    if (!isHittingRects(b, block)) return []


    // 横の重なり長さ
    const dx = (() => {
        if (b.x < block.x) {
            return (b.x + b.w) - block.x
        }
        if (b.x > block.x) {
            return (block.x + block.w) - b.x
        }
        return 0
    })()
    // 縦の重なり長さ
    const dy = (() => {
        if (b.y < block.y) {
            return (b.y + b.h) - block.y
        }
        if (b.y > block.y) {
            return (block.y + block.h) - b.y
        }
        return 0
    })()

    
    // 横の重なりが大きい場合、縦に押し戻す
    if (dx > dy) {
        // 上に押し戻す場合
        if (b.y < block.y) {
            b.y = block.y - b.h
            flag.push('b')
            b.isGround = true
        }
        // 下に押し戻す場合
        else {
            b.y = block.y + block.h
            flag.push('t')
        }
        b.v.y = 0
        
    }
    // 縦の重なりが大きい場合、横に押し戻す
    else {
        
        // 左に押し戻す場合
        if (b.x < block.x) {
            b.x = block.x - b.w
            flag.push('r')
        }
        // 右に押し戻す場合
        else {
            b.x = block.x + block.w
            flag.push('l')
        }
       b.v.x = 0
    }

    return flag
}