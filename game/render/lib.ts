import { GameCtx } from "../GameCtx";
import { Rect, Vec2 } from "../object/physics/physics";


export type ImgCtx = {
    img: CanvasImageSource,
    x: number,
    y: number,
    offset: Vec2,
    w: number,
    h: number,
    flipH: boolean
    rotate: number
}

export function drawImage(cctx: CanvasRenderingContext2D, imgCtx: ImgCtx) {
    
    cctx.save();
    // move to the center of the canvas
    cctx.translate(imgCtx.x, imgCtx.y)
    // rotate the canvas to the specified degrees
    cctx.rotate(imgCtx.rotate * Math.PI / 180);
    cctx.translate(-imgCtx.x, -imgCtx.y)
    // draw the image

    if (imgCtx.flipH) drawImageFlipHorizontally(cctx, imgCtx.img, imgCtx.x - imgCtx.offset.x, imgCtx.y + imgCtx.offset.y, imgCtx.w, imgCtx.h)
    else cctx.drawImage(imgCtx.img, imgCtx.x + imgCtx.offset.x, imgCtx.y + imgCtx.offset.y, imgCtx.w, imgCtx.h)

    cctx.restore();
}


export function drawImageFlipHorizontally(cctx: CanvasRenderingContext2D, img: CanvasImageSource, x: number, y: number, w: number, h: number) {
    cctx.translate(x + Number(w), y);
    cctx.scale(-1, 1);
    cctx.drawImage(img, 0, 0, w, h);
}




export function renderRect(gctx: GameCtx, cctx: CanvasRenderingContext2D, r: Rect, color: string, stroke = false, lineWidth: number = 4) {
    const screen = gctx.state.world.screen
    cctx.fillStyle = color
    cctx.strokeStyle = color
    cctx.lineWidth = lineWidth
    if (stroke) {
        cctx.strokeRect(r.x - screen.x, r.y - screen.y, r.w, r.h)
    } else {
        cctx.fillRect(r.x - screen.x, r.y - screen.y, r.w, r.h)
    }
}

export function renderLine(gctx: GameCtx, cctx: CanvasRenderingContext2D, line: Rect, lineWidth: number, color: string, fillColor: string | undefined = undefined) {
    const screen = gctx.state.world.screen
    cctx.fillStyle = color
    cctx.strokeStyle = color
    cctx.lineWidth = 4

    if (fillColor) {
        cctx.fillStyle = fillColor
        cctx.beginPath()
        cctx.moveTo(line.x - screen.x, line.y - screen.y)
        cctx.lineTo(line.x + line.w - screen.x, line.y + line.h - screen.y)
        if (line.h < 0) {
            cctx.lineTo(line.x + line.w - screen.x, line.y - screen.y)
        } else {
            cctx.lineTo(line.x - screen.x, line.y + line.h - screen.y)
        }
        cctx.fill()
        cctx.closePath()
    }

    cctx.strokeStyle = color
    cctx.lineWidth = lineWidth
    cctx.beginPath()
    cctx.moveTo(line.x - screen.x, line.y - screen.y)
    cctx.lineTo(line.x + line.w - screen.x, line.y + line.h - screen.y)
    cctx.stroke()
    cctx.closePath()
}