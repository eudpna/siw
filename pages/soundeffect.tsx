
import Head from 'next/head'
import React, { useEffect } from 'react'
import { A } from '../components/A'
import { Audio } from '../components/Audio'

const Atogaki: React.FC<{}> = () => {
    
    return <>
        <Head>
            <title>効果音ダウンロード | a shooter in the wilderness</title>            
        </Head>
        <div lang="ja" className="w-full pt-6 px-4 pb-12">
            <div>
                <p><A href="/" inSite>a shooter in the wilderness</A> &gt; 効果音ダウンロード</p>
         
                <section className="my-8">
                    <p>
                        自由に使えるフリー効果音です。<br />
                        自作ゲームなどにご利用ください。
                        <br />利用規約は特にないです。著作権表示などは不要です。
                    </p>
                </section>
                <section className="my-8">
                    <div>
                        <a
                            className="inline-block rounded-full py-2 px-8 border-gray-800 border no-underline text-black"
                            href="/downloads/siw_sound_effects.zip">
                            <div className="text-center">
                                <p className="font-bold">ダウンロード</p>
                                <p className="text-sm ">siw_sound_effects.zip (87KB)</p>
                            </div>
                        </a>
                    </div>
                </section>
                <section className="my-12">
                    <p>
                        蛇足：
                    </p>
                    <p>
                        これらの効果音は a shooter in the wilderness で使用するために nyaw.net が作成したものです。あまりクオリティは高くないですが、せっかくなのでフリー素材にしてみました。
                    </p>
                    <p>
                        効果音を作る際に使用したソフトは <A href="https://ymck.net/app/magical-8bit-plug">Magical 8bit Plug</A>、<A href="https://cdn.peko-step.com/tool/soundeffect/">効果音メーカー</A>、<A href="https://www.audacityteam.org/">Audacity</A> などです。
                    </p>
                </section>
                <section className="my-12">
                    <p>試聴：</p>
                    <ul>
                        {["nyaw/enemy-damage.mp3", "nyaw/enemy-destroy.mp3", "nyaw/jump-big.mp3", "nyaw/jump-small.mp3", "nyaw/player-damage.mp3", "nyaw/player-die.mp3", "nyaw/player-jump.mp3", "nyaw/player-levelup.mp3", "nyaw/player-shot.mp3", "nyaw/player-walk.mp3", "nyaw/ufo-shot-short.mp3", "nyaw/ufo-shot.mp3", "nyaw/xp-bounce.mp3", "nyaw/xp-get.mp3"].map((url, i) => {
                            const title = url.slice(5, -4)
                            return <li key={i} className="my-6">
                                <div>{title}</div>
                                <Audio src={`/audios/${url}`}></Audio>
                            </li>
                        })}
                    </ul>
                    
                </section>

            </div>
        </div>
    </>
}

export default Atogaki




