import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Canvas } from '@react-three/fiber';
import Logo from '@/atoms/logo';
import PastShowsTimeline from '@/atoms/pastShowsTimeline';
import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Event } from '@/ions/event';
import Separator from '@/atoms/separator';

interface HomeProps {
  events: Event[];
}

export default function Home({ events }: HomeProps) {
  return (
    <>
      <Head>
        <title>iieinander</title>
        <meta name="description" content="iieinander is a cutting-edge band" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://iieinander.band/iieinander_color.png"
        />
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
              iieinander is a cutting-edge band consisting of two talented
              artists, 2xAA and NERDDISCO, who come together to create a unique
              and captivating performance. Their music, crafted by 2xAA using
              Gameboy Advance, is paired with audio-reactive visuals generated
              by NERDDISCO in real-time, making each performance an
              unforgettable experience.
            </Typography>
            <Box component="div" mb={2} />
            <Typography variant="subtitle1">
              Founded in 2021 as a duo, they have been working together and
              performing shows since 2016, highlighting their individual talent
              and creativity. Their passion for pushing the boundaries of music
              and visual arts is evident in everything they, proving that
              anything is possible.
            </Typography>
          </div>

          <div className={styles.center}>
            {/* <Separator /> */}
            <Divider />
            <PastShowsTimeline events={events} />
          </div>

          <div className={styles.center}>
            <Divider />
            <Typography variant="h3">Media</Typography>

            <Box component="div" mb={2} />

            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <List>
                  <ListItemButton component="a" href="/iieinander_black.svg">
                    <ListItemText primary="Logo (black)" />
                  </ListItemButton>
                  <ListItemButton component="a" href="/iieinander_white.svg">
                    <ListItemText primary="Logo (white)" />
                  </ListItemButton>
                  <ListItemButton component="a" href="/iieinander_color.png">
                    <ListItemText primary="Logo (color)" />
                  </ListItemButton>
                </List>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className={styles.center}>
          <Typography variant="body2">© 2021 - 2023 by iieinander</Typography>
        </div>
      </main>
    </>
  );
}

Home.getInitialProps = async () => {
  const events = [
    {
      date: `2016-12-05`,
      title: `dotJS`,
      type: `talk`,
      url: `https://www.youtube.com/watch?v=GA7-OfYSzvA`,
    },
    {
      date: `2016-12-05`,
      title: `dotJS`,
      type: `show`,
      url: `https://www.youtube.com/watch?v=oR9vIXlu714`,
    },
    {
      date: `2017-05-06`,
      title: `JSConf EU with DESTROY WITH SCIENCE`,
      type: `show`,
      url: `https://www.youtube.com/watch?v=RWBQ69nicmw`,
    },
    {
      date: `2018-06-02`,
      title: `JSConf EU with LiveJS`,
      type: `intro show`,
      url: `https://youtu.be/dPWRaN2PXZw?t=158`,
    },
    {
      date: `2018-10-13`,
      title: `RuhrJS with half/byte`,
      type: `intro show`,
      url: `https://youtu.be/CqPO6b6UYcg`,
    },
    {
      date: `2018-10-13`,
      title: `RuhrJS with half/byte`,
      type: `show`,
      url: `https://youtu.be/U9NziTXy1S4`,
    },
    {
      date: `2018-11-09`,
      title: `dotJS with half/byte`,
      type: `show`,
      url: `https://www.youtube.com/watch?v=79eYdK9G8rU`,
    },
    {
      date: `2019-06-01`,
      title: `JSConf EU with LiveJS`,
      type: `intro show`,
      url: `https://www.youtube.com/watch?v=o1rzsna263c`,
    },
    {
      date: `2020-03-21`,
      title: `PENG - Ausgangssperre`,
      type: `show`,
      url: `https://www.youtube.com/watch?v=ylagilIkzj0&t=558s`,
    },
    {
      date: `2020-09-12`,
      title: `Open Up Summit`,
      type: `show`,
      url: `https://www.youtube.com/watch?v=RhM3arvVAPM`,
    },
    {
      date: `2020-12-13`,
      title: `GamerDisco 10th Anniversary`,
      type: `show`,
      url: `https://youtu.be/2oPTMdeySAA?t=14`,
    },
    {
      date: `2020-12-31`,
      title: `NYE 2020`,
      type: `show`,
      url: `https://www.youtube.com/watch?v=wErNJKB4mO0`,
    },
    {
      date: `2021-06-03`,
      title: `DevFest Live 2021`,
      type: `show & talk`,
      url: `https://www.youtube.com/watch?v=Mq7aExYoBMY&t=17s`,
    },
    {
      date: `2021-11-29`,
      title: `JSConf India 2021 with half/byte`,
      type: `intro show`,
      url: `https://www.youtube.com/watch?v=m9hJgGty-qk`,
    },
  ];

  // Sort the events by date
  events.sort(
    (a: any, b: any) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
  );

  return { events };
};
