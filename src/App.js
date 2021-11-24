import { useState, useMemo } from 'react'
import { BreakpointProvider } from 'react-socks'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import Header from './components/Header'
import Main from './components/Main'

const App = () => {
  const [mode, setMode] = useState(
    localStorage.getItem('room.theme') !== null
      ? localStorage.getItem('room.theme')
      : window.matchMedia('(prefers-color-sceheme: dark)').matches ? 'dark' : 'light'
  )

  const theme = useMemo(() => createTheme({ palette: { mode: mode, } }), [mode])

  return (
    <ThemeProvider theme={theme}>
      <BreakpointProvider>
        <Header setMode={setMode} />
        <Main />
      </BreakpointProvider>
    </ThemeProvider>
  )
}

export default App
