import { Block, Floor, Slope } from "../../object/physics/geo"
import { Vec2 } from "../../object/physics/physics"
import { getEnemys } from "./makeEnemys"
import { getGeo } from "./makeGeo"

export type Geo = {
    blocks: Block[]
    slopes: Slope[]
    floors: Floor[]
}

export type EnemyData = {
    kind: 'mofu' | 'bee'
    x: number
    y: number
    isBig?: boolean
}

export type Stage = {
    x: number
    y: number
    w: number
    h: number
    geo: Geo
    player: Vec2
    enemys: EnemyData[]
}




export function newStage(): Stage {
    const [floors, slopes] = getGeo()
    return {
        x: 0,
        y: 0,
        w: 100000 - 100,
        h: 1500,
        player: {
            x: 688,
            y: 920
        },
        enemys: getEnemys(),
        geo: {
            blocks: [
                {
                    x: -100,
                    y: 0,
                    w: 100,
                    h: 10000
                },
                {
                    x: 100000 - 100,
                    y: 0,
                    w: 100,
                    h: 10000
                }
            ],
            floors,
            slopes
        }
    }

}