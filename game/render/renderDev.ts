import { GameCtx } from "../GameCtx"
import { renderRect } from "./lib"




export function renderDev(gctx: GameCtx, cctx: CanvasRenderingContext2D) {
    const geo = gctx.state.world.stage.geo
    const player = gctx.state.world.player
    const screen = gctx.state.world.screen
    
    const stage = gctx.state.world.stage

    if (!gctx.state.isDevMode) return

    renderRect(gctx, cctx, stage, 'yellow', true)

    

    renderRect(gctx, cctx, player, 'skyblue', true)

    gctx.state.world.mofus.map(mofu => {
        renderRect(gctx, cctx, mofu, 'orange', true)
    })

    gctx.state.world.bees.map(bee => {
        renderRect(gctx, cctx, bee, 'orange', true)
    })

    if (gctx.state.world.ufo !== null) {
        renderRect(gctx, cctx, gctx.state.world.ufo, 'orange', true)
    }

    if (gctx.state.world.laser !== null) {
        renderRect(gctx, cctx, {
            ...gctx.state.world.laser
        }, 'orange', true)
    }

    geo.floors.map(floor => {
        cctx.fillStyle = 'red'
        renderRect(gctx, cctx, {...floor, h: 1}, 'red', true)
    })

    geo.blocks.map(block => {
        cctx.fillStyle = 'red'
        renderRect(gctx, cctx, block, 'red', true)
    })

    geo.slopes.map(slope => {
        cctx.strokeStyle = 'red'
        cctx.lineWidth = 4
        cctx.beginPath()
        cctx.moveTo(slope.x - screen.x, slope.y - screen.y)
        cctx.lineTo(slope.x + slope.w - screen.x, slope.y+slope.h - screen.y)
        cctx.stroke()
        cctx.closePath()
    })

    gctx.state.world.bullets.map(bullet => {
        renderRect(gctx, cctx, bullet, 'skyblue', true)
    })

    gctx.state.world.ufoBullets.map(bullet => {
        renderRect(gctx, cctx, bullet, 'orange', true)
    })



    const mouse = gctx.state.input.mouse
    if (mouse.isDown) {
        const x = (mouse.x/screen.scale) + screen.x
        const y = (mouse.y/screen.scale) + screen.y
        cctx.fillStyle = 'red'
        cctx.font = 'bold 30px sans-serif'
        cctx.fillText(`${Math.floor(x)}, ${Math.floor(y)}`, mouse.x, mouse.y)
    }
}

