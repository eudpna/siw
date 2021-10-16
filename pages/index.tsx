
import Head from 'next/head'
import React, { useEffect } from 'react'
import { A } from '../components/A';
import { Game } from '../components/game/Game';


const Index: React.FC<{}> = () => {
    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (['Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Down', 'ArrowDown', 'Up', 'ArrowUp', 'z', 'x'].includes(e.key)) {
                e.preventDefault()
            }
        })
        return () => {
            
        };
    }, []);
    return <>
        <Head>
            <title>a shooter in the wilderness</title>
            <meta name="viewport" content=""></meta>
        </Head>
        <div lang="ja" className="w-full pt-10">
            <div>
                <Game />
            </div>
            <div className="mx-auto max-w-xl pb-12" style={{
                maxWidth: '35rem'
            }}>
                <p className="py-4 text-center">
                    a shooter in the wilderness
                </p>
                <p>
                    新進気鋭のバウンティ・ハンターであるキミに新たな仕事の依頼だ。<br/>今回のミッションはとある惑星の荒地に出没する暴走宇宙船を撃破すること。<br/>危険な仕事だが、やり遂げれば賞金でとうぶん遊んで暮らせるだろう。<br/>道中、獰猛な宇宙生物にはじゅうぶん気をつけて。成功を祈る。
                </p>
                <div className="py-6">
                    <p className="text-center pb-1">操作方法</p>
                    <table className="border border-collapse border-black mx-auto">
                        <tbody>
                            <tr>
                                <td className="border border-black px-1">矢印</td>
                                <td className="border border-black px-1">移動、上を向く、下を向く</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-1">z</td>
                                <td className="border border-black px-1">ジャンプ</td>
                            </tr>
                            <tr>
                                <td className="border border-black px-1">x</td>
                                <td className="border border-black px-1">レーザーガン発射</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-center my-8 text-sm">
                    <A href="/soundeffect">効果音ダウンロード</A>
                </p>
            </div>
        </div>
    </>
}

export default Index




