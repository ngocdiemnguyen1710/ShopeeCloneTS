import { Toaster } from 'react-hot-toast'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <div>{routeElements}</div>
      <Toaster />
    </>
  )
}

export default App
