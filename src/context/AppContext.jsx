import { createContext, useContext, useState } from 'react'
import { load, save } from '../utils/storage'

const AppContext = createContext(null)

const PROFILE_KEY = 'mg_profile'
const HISTORY_KEY = 'mg_history'

export function AppProvider({ children }) {
  const [profile, setProfileState] = useState(() => load(PROFILE_KEY, {}))
  const [history, setHistoryState] = useState(() => {
    const all = load(HISTORY_KEY, [])
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    return all.filter(item => new Date(item.date) >= cutoff)
  })

  function setProfile(data) {
    setProfileState(data)
    save(PROFILE_KEY, data)
  }

  function addHistory(item) {
    setHistoryState(prev => {
      const next = [item, ...prev].slice(0, 50)
      save(HISTORY_KEY, next)
      return next
    })
  }

  return (
    <AppContext.Provider value={{ profile, setProfile, history, addHistory }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
