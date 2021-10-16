import { Slope } from "../../object/physics/geo"
import { Floor } from "../../object/physics/geo"

type GeoData = [number, number][]

type GeoSetting = {
    w: number
    h: number
}

export function getGeo(): [Floor[], Slope[]] {
    const geoData = randomGeo({
        w: 100000,
        h: 500
    })
    const g = makeGeo(geoData)
    return g
}

export function getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomGeo(s: GeoSetting): GeoData {
    const p = {
        x: 0,
        y: s.h / 2
    }
    const g = []
    let count = 0

    while (p.x < s.w) {
        let line: [number, number] = [0, 0]
        
        line = (() => {
            if (count === 0) {
                return [1200, 0]
            }
            else if (count % 2 === 0) {
                return [getRandomInt(300, 1400), 0]
            } else {
                return [getRandomInt(300, 500), getRandomInt(20, 200) * (getRandomInt(0, 1) === 0 ? 1 : -1)]
            }
        })() as [number, number]

        if (p.y + line[1] < 0 || p.y + line[1] > s.h) line[1] = -line[1]
        
        g.push(line)
        p.x += line[0]
        p.y += line[1]
        
        count ++
    }
    return g
}

function makeGeo(geoData: GeoData): [Floor[], Slope[]] {
    const floors: Floor[] = []
    const slopes: Slope[] = []
    const p = {
        x: -100,
        y: 1000
    }
    geoData.forEach(line => {
        if (line[1] === 0)  {
            floors.push({
                x: p.x,
                y: p.y,
                w: line[0],
            })
        } else {
            slopes.push({
                x: p.x,
                y: p.y,
                w: line[0],
                h: line[1]
            })
        }
        p.x += line[0]
        p.y += line[1]
    })
    return [floors, slopes]
}