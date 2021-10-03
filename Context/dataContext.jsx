import React, { useState } from 'react'

const DataContext = React.createContext()

const ProviderDataContext = ({ children }) => {
  const [data, setData] = useState({
    latitude: null,
    longitude: null,
    start: null,
    end: null,
  })
  return (
    <DataContext.Provider value={{
      data,
      setData,
    }}
    >
      { children }
    </DataContext.Provider>
  )
}

export { DataContext, ProviderDataContext }