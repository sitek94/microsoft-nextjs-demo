'use client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import * as React from 'react'

import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react'
import {useMediaQuery} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles'
import {useServerInsertedHTML} from 'next/navigation'

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeProvider({children}: {children: React.ReactNode}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const themeMode = prefersDarkMode ? 'dark' : 'light'

  const {cache, flush} = React.useMemo(
    () => createEmotionCache(`mui-${themeMode}`),
    [themeMode],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
        components: {
          // Make scrollbar color match theme, because is not always applied
          MuiCssBaseline: {
            styleOverrides: {
              ':root': {
                'color-scheme': prefersDarkMode ? 'dark' : 'light',
              },
            },
          },
        },
      }),
    [themeMode, prefersDarkMode],
  )

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

function createEmotionCache(key: string) {
  const cache = createCache({key})
  cache.compat = true
  const prevInsert = cache.insert
  let inserted: string[] = []
  cache.insert = (...args) => {
    const serialized = args[1]
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name)
    }
    return prevInsert(...args)
  }

  const flush = () => {
    const prevInserted = inserted
    inserted = []
    return prevInserted
  }

  return {cache, flush}
}
