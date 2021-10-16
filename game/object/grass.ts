import { getRandomInt } from "../content/stage/makeGeo"
import { GameCtx } from "../GameCtx"
import { getFloorY } from "./physics/geo"
import { Bodi, Direction2 } from "./physics/physics"
import { drawImage } from "../render/lib"


export type Grass = {
    x: number
    y: number
    direction: Direction2
    isDistant: boolean
    size: number
}

export function renderGrasses(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    gctx.state.world.grasses.map(grass => renderGrass(gctx, cctx, grass))
}

function renderGrass(gctx: GameCtx, cctx: CanvasRenderingContext2D, grass: Grass): void {
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs

    const img = imgs['grass']

    let scale = 0.3 + (grass.size * 0.2)
    
    drawImage(cctx, {
        img: img,
        x: grass.x - screen.x - ((img.width * scale) /2),
        y: grass.y - screen.y - ((img.height-20) * scale),
        offset: {
            x: 0,
            y: 0,
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: grass.direction === 'l',
        rotate: 0,
    })
}

export function makeGrasses(gctx: GameCtx) {
    const grasses = gctx.state.world.grasses
    const player = gctx.state.world.player
    
    // プレイヤー位置
    const grass: Grass = {
        x: player.x,
        y: getFloorY(gctx, player.x),
        direction: getRandomInt(0, 1) === 0 ? 'l' : 'r',
        size: getRandomInt(0, 2),
        isDistant: !!getRandomInt(0, 1),
    }
    grasses.push(grass)
    
    
    const p = {
        x: 0,
        y: 0
    }
    while (p.x < 50000) {
        p.x += getRandomInt(50, 800)

        const grass: Grass = {
            x: p.x,
            y: getFloorY(gctx, p.x),
            direction: getRandomInt(0, 1) === 0 ? 'l' : 'r',
            size: Math.random(),
            isDistant: !!getRandomInt(0, 1),
        }
        grasses.push(grass)
    }
}

