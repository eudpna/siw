import urlList from '../../script/resource/audioList.json'
import { Howl } from 'howler'
import path from 'path'
import { GameResource } from './GameResource'

export default async function loadAudios(): Promise<GameResource['audios']> {

    const audios = await Promise.all(urlList.map(url => getAudio(path.join('audios', url))))

    const results: { [key: string]: Howl } = {}

    for (let i = 0; i < urlList.length; i++) {
        results[path.basename(urlList[i], '.mp3')] = audios[i]
    }

    return results
}


function getAudio(url: string): Promise<Howl> {
    return new Promise((resolve, reject) => {
        const rootPath = '/'

        const sound = new Howl({
            src: [rootPath+url]
        });

        sound.on("load", () => {
            resolve(sound)
        })
        
    })
}


