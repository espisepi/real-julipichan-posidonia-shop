import { useRef } from 'react';
import { useScroll, animated, useSpring } from '@react-spring/web'
import juliaPic from '@/public/julia.jpg';
import Image from 'next/image'
import styles from '@/styles/About.module.css';


// Dom components go here
export default function AboutPage(props) {
  const containerRef = useRef<HTMLDivElement>(null!)
  const barContainerRef = useRef<HTMLDivElement>(null!)

  const [textStyles, textApi] = useSpring(() => ({
    y: '100%',
  }))

  // https://codesandbox.io/s/b07dmz?file=/src/App.tsx
  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      // Si queremos hacerlo global para guardarlo en una variable
      if (scrollYProgress > 0.7) {
        textApi.start({ y: '0' })
      } else {
        textApi.start({ y: '100%' })
      }
    },
    default: {
      immediate: false,
    },
  });

  const velocityAndPosition = 100;

  return (
    <div ref={containerRef} className={styles.main}>
      <div
        className={[styles.container_image, styles.floating_animation].join(' ')}>
        <Image
          src={juliaPic}
          alt='Picture of the author'
          width={300}
          height={500}
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </div>
      <animated.h1
        style={{
          fontSize: '23px',
          textAlign: 'justify', // En ordenador 'center'
          paddingTop: '40px',
          paddingBottom: '20px',
        }}>
        Inspirada en elementos y texturas de la naturaleza acuática, con la intención de tener en el hogar una pieza que
        transporte al individuo a ese gran lugar de paz que es el océano.
      </animated.h1>
      <animated.h1
        style={{
          transform: scrollYProgress.to(
            (scrollP) => `translateY(${velocityAndPosition - scrollP * velocityAndPosition}px)`,
          ),
          fontSize: '21px',
          textAlign: 'center',
          paddingBottom: '13px',
        }}>
        <i>¿Porque posidonia?</i>
      </animated.h1>
      <animated.h2
        style={{
          transform: scrollYProgress.to(
            (scrollP) => `translateY(${velocityAndPosition - scrollP * velocityAndPosition}px)`,
          ),
          fontSize: '18px',
          textAlign: 'justify',
        }}>
        Posidonia es una planta acuática endémica del Mediterráneo que contribuye a la oxigenación del agua, para peces,
        moluscos y crustáceos son lugares de puesta, refugio y alimento. Además, su disposición hace que las olas rompan
        con menos intensidad en las playas y así evita la pérdida de arena.
      </animated.h2>
      <animated.h2
        style={{
          transform: scrollYProgress.to(
            (scrollP) => `translateY(${velocityAndPosition - scrollP * velocityAndPosition}px)`,
          ),
          fontSize: '18px',
          textAlign: 'justify',
          paddingTop: '16px',
        }}>
        <b>Puesta:</b> la cerámica tiene un proceso lento y hay que ponerse y dedicarle tiempo.
      </animated.h2>
      <animated.h2
        style={{
          transform: scrollYProgress.to(
            (scrollP) => `translateY(${velocityAndPosition - scrollP * velocityAndPosition}px)`,
          ),
          fontSize: '18px',
          textAlign: 'justify',
          paddingTop: '10px',
        }}>
        <b>Refugio:</b> la cerámica requiere tanta concentración que hace que te olvides de todo, sirviendo así de
        refugio de todo lo exterior.
      </animated.h2>
      <animated.h2
        style={{
          transform: scrollYProgress.to(
            (scrollP) => `translateY(${velocityAndPosition - scrollP * velocityAndPosition}px)`,
          ),
          fontSize: '18px',
          textAlign: 'justify',
          paddingTop: '10px',
        }}>
        <b>Alimento: </b> de una forma u otra la cerámica almenta, ya sea por su uso doméstico o por su habilidad de
        hacer crecer a uno mismo alimentado el alma.
      </animated.h2>
      <div style={{ height: '10vh' }}></div>
    </div>
  )
}
// Mirar el fontsize solamente para ver las de ordenador
    // ;<div style={{ padding: '50px', overflow: 'auto', height: '100vh' }}>
    //   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    //     <Image
    //       src={juliaPic}
    //       alt='Picture of the author'
    //       width={300}
    //       height={500}
    //       // blurDataURL="data:..." automatically provided
    //       // placeholder="blur" // Optional blur-up while loading
    //     />
    //   </div>
    //   <h1
    //     style={{
    //       fontSize: '25px',
    //       textAlign: 'center',
    //       paddingTop: '40px',
    //       paddingBottom: '20px',
    //     }}>
    //     Inspirada en los elementos y texturas de la naturaleza acuática, con la intención de tener en el hogar una pieza
    //     que transporte al individuo a ese gran lugar de paz que es el océano.
    //   </h1>
    //   <h1 style={{ fontSize: '23px', textAlign: 'center', paddingBottom: '13px' }}>
    //     <i>¿Porque posidonia?</i>
    //   </h1>
    //   <h2 style={{ fontSize: '20px', textAlign: 'justify' }}>
    //     Posidonia es una planta acuática endémica del Mediterráneo que contribuye a la oxigenación del agua, para peces,
    //     moluscos y crustáceos son lugares de puesta, refugio y alimento. Además, su disposición hace que las olas rompan
    //     con menos intensidad en las playas y así evita la pérdida de arena.
    //   </h2>
    //   <h2 style={{ fontSize: '20px', textAlign: 'justify', paddingTop: '16px' }}>
    //     <b>Puesta:</b> la cerámica tiene un proceso lento y hay que ponerse y dedicarle tiempo.
    //   </h2>
    //   <h2 style={{ fontSize: '20px', textAlign: 'justify', paddingTop: '10px' }}>
    //     <b>Refugio:</b> la cerámica requiere tanta concentración que hace que te olvides de todo, sirviendo así de
    //     refugio de todo lo exterior.
    //   </h2>
    //   <h2 style={{ fontSize: '20px', textAlign: 'justify', paddingTop: '10px' }}>
    //     <b>Alimento: </b> de una forma u otra la cerámica almenta, ya sea por su uso doméstico o por su habilidad de
    //     hacer crecer a uno mismo alimentado el alma.
    //   </h2>
    // </div>



export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
