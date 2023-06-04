import { Toaster } from 'react-hot-toast'
import useRouteElements from './useRouteElements'
import { useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { useAuth } from './contexts/auth.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useAuth()
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', () => {
      reset()
    })

    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', () => {
        reset()
      })
    }
  }, [reset])
  return (
    <>
      <div>{routeElements}</div>
      <Toaster />
    </>
  )
}

export default App
