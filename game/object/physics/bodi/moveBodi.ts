import { collideBodiWithGeo } from "./collideBodiWithGeo";
import { Bodi, Vec2 } from "../physics";
import { Geo } from "../../../content/stage/stage";


export function moveBodi(b: Bodi, force: Vec2, geo: Geo, nodrag: boolean = false): void {
    // 力
    b.v.x += force.x
    b.v.y += force.y
    // 抗力
    if (!nodrag) dragBodi(b)
    // 速度制限
    if (b.maxSpeed !== undefined)  {
        if (b.v.x < -b.maxSpeed.x) b.v.x = -b.maxSpeed.x
        else if (b.v.x > b.maxSpeed.x) b.v.x = b.maxSpeed.x
        
        if (b.v.y < -b.maxSpeed.y) b.v.y = -b.maxSpeed.y
        else if (b.v.y > b.maxSpeed.y) b.v.y = b.maxSpeed.y
        // b.v.x = restrict(b.v.x, -b.maxSpeed.x, b.maxSpeed.x)
        // b.v.y = restrict(b.v.y, -b.maxSpeed.y, b.maxSpeed.y)
    }

    // 移動
    b.x += b.v.x
    // geo.blocks.map(block => collideBodiWithBlock(b, block, ['l', 'r']))
    b.y += b.v.y
    // geo.blocks.map(block => collideBodiWithBlock(b, block, ['t', 'b']))
    if (!b.noCollide) {
        collideBodiWithGeo(b, geo)
    }
}

function dragBodi(b: Bodi): void {
    if (b.drag === undefined) return
    if (b.v.x > 0) {
        if (b.v.x > b.drag) b.v.x -= b.drag
        else b.v.x = 0
    }
    if (b.v.x < 0) {
        if (b.v.x < -b.drag) b.v.x += b.drag
        else b.v.x = 0
    }    
}