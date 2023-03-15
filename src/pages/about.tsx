import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import juliaPic from '@/public/julia.jpg';
import Image from 'next/image'


// Dom components go here
export default function Page(props) {
  return (
    <div style={{ padding: '50px' }}>
      <div style={{display:'flex'}}>
            <Image
            src={juliaPic}
            alt='Picture of the author'
            width={300}
            height={500}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
            />
        </div>
      <h1 style={{ fontSize: '30px' }}>
        Inspirada en los elementos y texturas de la naturaleza acuática, con la intención de tener en el hogar una pieza
        que transporte al individuo a ese gran lugar de paz que es el océano.
      </h1>
      <h2 style={{ fontSize: '20px' }}>
        ¿Porque posidonia? Posidonia es una planta acuática endémica del Mediterráneo que contribuye a la oxigenación
        del agua, para peces, moluscos y crustáceos son lugares de puesta, refugio y alimento. Además, su disposición
        hace que las olas rompan con menos intensidad en las playas y así evita la pérdida de arena. Y al fin y al cabo
        eso es la cerámica para mi, Puesta: la cerámica tiene un proceso lento y hay que ponerse y dedicarle tiempo.
        Refugio: la cerámica requiere tanta concentración que hace que te olvides de todo, sirviendo así de refugio de
        todo lo exterior. Comida: de una forma u otra la cerámica almenta, ya sea por su uso doméstico o por su
        habilidad de hacer crecer a uno mismo alimentado el alma.
      </h2>
    </div>
  )
}


export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
