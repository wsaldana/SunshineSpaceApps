import React, { useState } from 'react'

const DataContext = React.createContext()

const ProviderDataContext = ({ children }) => {
  const [data, setData] = useState({
    latitude: 10,
    longitude: 10,
    start: 2000,
    end: 2010,
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