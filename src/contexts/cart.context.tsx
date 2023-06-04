import { Dispatch, ReactNode, createContext, useContext, useState } from 'react'
import { ExtendedPurchases } from 'src/types/purchase.type'

interface AppContextInterface {
  extendedPurchases: ExtendedPurchases[]
  setExtendedPurchases: Dispatch<React.SetStateAction<ExtendedPurchases[]>>
}

const initialCart: AppContextInterface = {
  extendedPurchases: [],
  setExtendedPurchases: () => null
}
const CartContext = createContext<AppContextInterface>(initialCart)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>(initialCart.extendedPurchases)

  return <CartContext.Provider value={{ extendedPurchases, setExtendedPurchases }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
