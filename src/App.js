import Header from './components/Header'
import Main from './components/Main'
import { BreakpointProvider } from 'react-socks';

const App = () => (
  <div>
    <BreakpointProvider>
    <Header />
    <Main />
    </BreakpointProvider>
  </div>
)

export default App
