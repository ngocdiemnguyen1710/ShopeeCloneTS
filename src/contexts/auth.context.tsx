import { Dispatch, ReactNode, createContext, useContext, useState } from 'react'
import { User } from 'src/types/users.type'
import { getAccessTokenLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: Dispatch<React.SetStateAction<User | null>>
}

const initialAuth: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}
const AuthContext = createContext<AppContextInterface>(initialAuth)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuth.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAuth.profile)
  console.log(isAuthenticated)
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
