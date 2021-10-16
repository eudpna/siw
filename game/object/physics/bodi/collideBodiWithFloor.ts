
import { Floor } from "../geo";

import { Bodi, Direction4, Rect, Vec2 } from "../physics";




export function collideBodiWithFloor(b: Bodi, floor: Floor) {

  

    // 床の上にいるか
    if (!(Math.max(b.x, floor.x) <= Math.min(b.x + b.w, floor.x + floor.w))) return





 


    const y = b.y + b.h


        // 下にめり込んでいたら押し上げる
        if (y > floor.y) {
            b.y -= y - floor.y
            b.isGround = true
            b.v.y = 0
        }
  
}


