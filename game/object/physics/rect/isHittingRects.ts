import { Direction4, Rect, Vec2 } from "../physics";

export function isHittingRects(r1: Rect, r2: Rect): boolean {
    return Math.max(r1.x, r2.x) <= Math.min(r1.x + r1.w, r2.x + r2.w) &&
    Math.max(r1.y, r2.y) <= Math.min(r1.y + r1.h, r2.y + r2.h)
}