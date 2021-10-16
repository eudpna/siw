


import { Geo } from "../../../content/stage/stage";
import { getDistance } from "../math";
import { Bodi, Direction4, Rect, Vec2 } from "../physics";
import { collideBodiWithBlock } from "./collideBodiWithBlock";
import { collideBodiWithFloor } from "./collideBodiWithFloor";
import { collideBodiWithSlope } from "./collideBodiWithSlope";

export function collideBodiWithGeo(b: Bodi, geo: Geo) {
    b.isGround = false
    const range = 3000
    
    geo.floors.filter(g => getDistance(b, g) < range).map(floor => collideBodiWithFloor(b, floor))
    geo.slopes.filter(g => getDistance(b, g) < range).map(slope => collideBodiWithSlope(b, slope))
    geo.blocks.filter(g => getDistance(b, g) < range).map(block => collideBodiWithBlock(b, block))

}





