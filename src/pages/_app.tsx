import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/atoms/theme';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/ions/createEmotionCache';
import CssBaseline from '@mui/material/CssBaseline';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
