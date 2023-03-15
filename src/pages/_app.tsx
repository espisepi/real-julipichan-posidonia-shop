import { useRef } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/config'
import Layout from '@/components/dom/Layout'
import '@/styles/index.css'
import { Special_Elite } from 'next/font/google'


const special_elite = Special_Elite({
  weight: '400',
  subsets: ['latin'],
})

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

const SceneBackground = dynamic(() => import('@/components/canvas/background/SceneBackground'), { ssr: true })


export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${special_elite.style.fontFamily};
        }
      `}</style>
      <Header title={pageProps.title} />
      {/**@ts-ignore */}
      <Layout ref={ref}>
        <Component {...pageProps} />

        {/** TODO: CANVAS BACKGROUND */}
        <SceneBackground />
        {/* <CanvasBackground /> */}

        {/** USAR ESTE CANVAS PARA MOSTRAR ELEMENTOS 3D FLOTANTES  POR ENCIMA DEL DOM Y SIN BACKGROUND CANVAS */}
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
            {Component.canvas(pageProps)}
          </Scene>
        )}
      </Layout>
    </>
  )
}
