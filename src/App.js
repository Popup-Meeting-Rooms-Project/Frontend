import { BreakpointProvider } from 'react-socks'

import Header from './components/Header'
import Main from './components/Main'

const App = () => (
    <BreakpointProvider>
      <Header />
      <Main />
    </BreakpointProvider>
)

export default App
