import { Howl } from 'howler'

export type GameResource = {
    imgs: { [key: string]: HTMLImageElement }
    audios: { [key: string]: Howl }
}