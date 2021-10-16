import { EnemyData } from "./stage"

type EnemySetting = {
    w: number
}

const way = 12000

export function getEnemys(): EnemyData[] {
     const enemyData = randomEnemy({
        w: way,
    })
    return enemyData
}


export function getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
}

function randomEnemy(s: EnemySetting): EnemyData[] {
    const p = {
        x: 0
    }
    const e: EnemyData[] = []
    let count = 0

    // bee
    p.x = 7000
    while (p.x < s.w) {
        const bee: EnemyData = {
            kind: 'bee',
            x: p.x + getRandomInt(1000, 2000),
            y: 500
        }

        p.x = bee.x
        e.push(bee)
        count ++
    }

    // bigMofu
    p.x = 5000
    while (p.x < s.w) {
        const mofu: EnemyData = {
            kind: 'mofu',
            x: p.x + getRandomInt(1000, 4000),
            y: 500,
            isBig: true
        }

        p.x = mofu.x
        e.push(mofu)
        count++
    }

    // mofu
    p.x = 2000
    while (p.x < s.w) {
        const mofu: EnemyData = {
            kind: 'mofu',
            x: p.x + getRandomInt(100, 2000),
            y: 500
        }

        p.x = mofu.x
        e.push(mofu)
        count++
    }

    return e.filter(e => e.x < way)
}