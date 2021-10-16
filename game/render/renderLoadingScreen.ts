export function renderLoadingScreen(cctx: CanvasRenderingContext2D): void {
    cctx.fillStyle = 'black'
    cctx.fillRect(0, 0, cctx.canvas.width, cctx.canvas.height)

    cctx.fillStyle = 'white'
    cctx.font = 'bold 24px sans-serif'
    cctx.textAlign = 'center'
    cctx.textBaseline = 'middle'
    cctx.fillText(`ロード中...`, cctx.canvas.width / 2, cctx.canvas.height / 2)
}