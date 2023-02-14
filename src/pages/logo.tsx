import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Canvas } from '@react-three/fiber';
import { default as LogoComponent } from '@/atoms/logo';

export default function Logo() {
  return (
    <>
      <Head>
        <title>iieinander - Logo</title>
        <meta name="description" content="iieinander is a cutting-edge band" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.fullPage}>
          <Canvas
            camera={{
              fov: 20,
              near: 0.1,
              far: 200,
              position: [0, 0, 12],
            }}
          >
            <LogoComponent />
          </Canvas>
        </div>
      </main>
    </>
  );
}
