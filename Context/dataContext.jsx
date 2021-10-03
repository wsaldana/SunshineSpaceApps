import React, { useState } from 'react'

const DataContext = React.createContext()

const ProviderDataContext = ({ children }) => {
  const [data, setData] = useState({
    latitude: 90,
    longitude: 14.36,
    start: 20150101,
    end: 20150305,
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
