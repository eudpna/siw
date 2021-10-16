import { GameCtx } from "../../GameCtx"
import { drawImage, renderLine } from "../../render/lib"

export function renderStage(gctx: GameCtx, cctx: 
    CanvasRenderingContext2D): void {
    const imgs = gctx.resource.imgs
    const screen = gctx.state.world.screen

    renderSky(gctx, cctx)

    const img = imgs['wild-back2']
    const scale = 1.2
    const tmp = Math.floor((150 + screen.x / 4.15) / (img.width * scale))
    renderBg(gctx, cctx, tmp)
    renderBg(gctx, cctx, tmp + 1)
}

function renderSky(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs
    // 空
    const g =  cctx.createLinearGradient(screen.w/2, 0, screen.w/2, screen.h)
    g.addColorStop(0, 'gray')
    g.addColorStop(1, 'white')
    cctx.fillStyle = g
    cctx.fillRect(0, 0, screen.w*2, screen.h*2)
}

function renderBg(gctx: GameCtx, cctx: CanvasRenderingContext2D, page: number): void {
    const screen = gctx.state.world.screen
    const imgs = gctx.resource.imgs
    const scale = 1.2
 
    const img = imgs['wild-back2']

    drawImage(cctx, {
        img: img,
        x: -150 - screen.x / 4.15 + (page * (img.width - 221) * scale),
        y: -600 - (screen.y / 4.15) + 100,
        offset: {
            x: 0,
            y: 0,
        },
        w: img.width * scale,
        h: img.height * scale,
        flipH: false,
        rotate: 0,
    })
}

export function renderGeos(gctx: GameCtx, cctx: CanvasRenderingContext2D): void {
    const screen = gctx.state.world.screen
    const stage = gctx.state.world.stage

    stage.geo.slopes.map(slope => {
        cctx.fillStyle = 'black'
        cctx.beginPath()
        cctx.moveTo(slope.x - screen.x, slope.y - screen.y)
        cctx.lineTo(slope.x + slope.w - screen.x, slope.y + slope.h - screen.y)
        cctx.lineTo(slope.x + slope.w - screen.x, slope.y + slope.h - screen.y + 10000)
        cctx.lineTo(slope.x - screen.x, slope.y + slope.h - screen.y + 10000)
        cctx.lineTo(slope.x - screen.x, slope.y - screen.y)
        cctx.fill()
        cctx.closePath()
        renderLine(gctx, cctx, slope, 4, 'black')
      
    })

    stage.geo.floors.map(floor => {
        cctx.fillStyle = 'black'
        cctx.beginPath()
        cctx.moveTo(floor.x - screen.x, floor.y - screen.y)
        cctx.lineTo(floor.x + floor.w - screen.x, floor.y - screen.y)
        cctx.lineTo(floor.x + floor.w - screen.x, floor.y  - screen.y + 10000)
        cctx.lineTo(floor.x - screen.x, floor.y - screen.y + 10000)
        cctx.lineTo(floor.x - screen.x, floor.y - screen.y)
        cctx.fill()
        cctx.lineWidth = 2
        cctx.strokeStyle = 'black'
        cctx.stroke()
        cctx.closePath()
        renderLine(gctx, cctx, {
            ...floor,
            h: 0
        }, 4, 'black')
    })

    stage.geo.blocks.map(block => {
        renderLine(gctx, cctx, {
            ...block,
            h: 0
        }, 4, 'black', 'white')
    })
}
