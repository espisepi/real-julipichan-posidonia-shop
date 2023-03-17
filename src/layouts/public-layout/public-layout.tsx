import { forwardRef, ReactNode } from 'react'
import styles from './public-layout.module.css';

type PublicLayoutProps = {
  children: ReactNode
}

type Ref = HTMLDivElement;


export const PublicLayout = forwardRef<Ref, PublicLayoutProps>( ({ children }: PublicLayoutProps, ref ) => {
  return (
    <div ref={ref} className={styles.main}>
      {children}
    </div>
  )
});
