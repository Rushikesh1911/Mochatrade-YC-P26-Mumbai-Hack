import { createContext, useContext } from 'react'
const AppContext = createContext(null)
export const AppProvider = ({ children }) => <AppContext.Provider value={{}}>{children}</AppContext.Provider>
export const useAppContext = () => useContext(AppContext)
