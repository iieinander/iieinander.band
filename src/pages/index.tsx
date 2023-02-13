import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Canvas } from '@react-three/fiber';
import Logo from '@/components/logo';
import PastShowsTimeline from '@/atoms/pastShowsTimeline';
import { Box, Typography } from '@mui/material';

export default function Home({ events }) {
  return (
    <>
      <Head>
        <title>iieinander</title>
        <meta name="description" content="iieinander is a band" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.logo}>
          <Canvas
            camera={{
              fov: 20,
              near: 0.1,
              far: 200,
              position: [0, 0, 10],
            }}
          >
            <Logo />
          </Canvas>
        </div>

        <div className={styles.container}>
          <div className={styles.center}>
            <Typography variant="subtitle1">
              iieiander is a cutting-edge band consisting of two talented
              artists, 2xAA and NERDDISCO, who come together to create a unique
              and captivating performance. Their music, crafted by 2xAA using
              Gameboy Advance, is paired with audio-reactive visuals generated
              by NERDDISCO in real-time, making each performance an
              unforgettable experience.
            </Typography>
            <Box mb={2} />
            <Typography variant="body1">
              Founded in 2021 as a duo, they have been working together and
              performing shows since 2016, showcasing their individual talent
              and creativity. Their passion for pushing the boundaries of music
              and visual arts is evident in every performance, showing that
              anything is possible.
            </Typography>
          </div>

          <div className={styles.center}>
            <PastShowsTimeline events={events} />
          </div>

          <div className={styles.center}>
            <Typography variant="h3">Media</Typography>
          </div>
        </div>
      </main>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const events = [
    {
      date: `2016-12-05`,
      title: `dotJS - Talk`,
      url: `https://www.youtube.com/watch?v=GA7-OfYSzvA`,
    },
    {
      date: `2016-12-05`,
      title: `dotJS - Performance`,
      url: `https://www.youtube.com/watch?v=oR9vIXlu714`,
    },
    {
      date: `2017-05-06`,
      title: `JSConf EU - Performance with DESTROY WITH SCIENCE`,
      url: `https://www.youtube.com/watch?v=RWBQ69nicmw`,
    },
    {
      date: `2018-06-02`,
      title: `JSConf EU - Intro Performance with LiveJS`,
      url: `https://youtu.be/dPWRaN2PXZw?t=158`,
    },
    {
      date: `2018-10-13`,
      title: `RuhrJS - Intro Performance with half/byte`,
      url: `https://youtu.be/CqPO6b6UYcg`,
    },
    {
      date: `2018-10-13`,
      title: `RuhrJS - Performance with half/byte`,
      url: `https://youtu.be/U9NziTXy1S4`,
    },
    {
      date: `2018-11-09`,
      title: `dotJS - Performance with half/byte`,
      url: `https://www.youtube.com/watch?v=79eYdK9G8rU`,
    },
    {
      date: `2019-06-01`,
      title: `JSConf EU - Intro Performance with LiveJS`,
      url: `https://www.youtube.com/watch?v=o1rzsna263c`,
    },
    {
      date: `2020-03-21`,
      title: `PENG - Ausgangssperre - Performance`,
      url: `https://www.youtube.com/watch?v=ylagilIkzj0&t=558s`,
    },
    {
      date: `2020-09-12`,
      title: `Open Up Summit - Performance`,
      url: `https://www.youtube.com/watch?v=RhM3arvVAPM`,
    },
    {
      date: `2020-12-13`,
      title: `GamerDisco 10th Anniversary - Performance`,
      url: `https://youtu.be/2oPTMdeySAA?t=14`,
    },
    {
      date: `2020-12-31`,
      title: `NYE 2020 - Performance`,
      url: `https://www.youtube.com/watch?v=wErNJKB4mO0`,
    },
  ];

  // Sort the events by date
  events.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { events };
};
