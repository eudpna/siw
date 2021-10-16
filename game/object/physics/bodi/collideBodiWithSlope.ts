
import { Slope } from "../geo";

import { Bodi, Direction4, Rect, Vec2 } from "../physics";




export function collideBodiWithSlope(b: Bodi, slope: Slope) {

    // 坂の傾き
    const coef = slope.h / slope.w


    // bodiの下端を求める
    const cb = (() => {
        // 右下がりの坂
        if (coef > 0) {
            return {
                x: b.x,
                y: b.y + b.h
            }
        }
        // 右上がりの坂
        else {
            return {
                x: b.x + b.w,
                y: b.y + b.h
            }
        }
    })()

    // 坂の上にいるか
    const isOnSlope = slope.x-2 < cb.x && cb.x < slope.x+slope.w+2

    if (!isOnSlope) return

    

    


    
    
    // bodiのいるx座標での地面の高さ
    const y = slope.y + ((cb.x - slope.x) * coef)



 
        // 下にめり込んでいたら押し上げる
        if (cb.y > y) {
            b.y -= cb.y - y
            b.isGround = true
            b.isOnSlope = true
            b.v.y = 0
        }

    

    

    // 坂に沿って歩く
    if (b.isJump === false) {
        if (cb.y < y &&  y - cb.y < 50) {
            b.y += y - cb.y
            b.isGround = true
            b.isOnSlope = true
            b.v.y = 0
        }
    }
}




