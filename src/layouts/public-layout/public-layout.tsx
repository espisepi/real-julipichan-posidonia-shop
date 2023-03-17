import { forwardRef, ReactNode } from 'react'
import styles from './public-layout.module.css';
// import { Footer } from '@/components/dom/footer/Footer';

type PublicLayoutProps = {
  children: ReactNode
}

type Ref = HTMLDivElement;


export const PublicLayout = forwardRef<Ref, PublicLayoutProps>( ({ children }: PublicLayoutProps, ref ) => {
  return (
    <div ref={ref} className={styles.main}>
      {children}
      {/**
       * <Footer /> lo ponemos en cada page por si queremos moverlo con el scroll
       */}
    </div>
  )
});
