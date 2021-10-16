import urlList from '../../script/resource/imgList.json'
import path from 'path'
import { GameResource } from './GameResource'

export default async function loadImages(): Promise<GameResource['imgs']> {

    const imgs = await Promise.all(urlList.map(url => getImage(path.join('images', url))))

    const results: { [key: string]: HTMLImageElement } = {}

    for (let i = 0; i < urlList.length; i++) {
        results[path.basename(urlList[i], '.png')] = imgs[i]
    }

    return results
}


function getImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const rootPath = '/'

        const image = new Image() // Using optional size for image

        image.src = rootPath + url
        image.addEventListener('load', e => {
            resolve(image)
        });
    })
}


