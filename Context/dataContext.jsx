import React, { useState } from 'react'

const DataContext = React.createContext()

const ProviderDataContext = ({ children }) => {
  const [data, setData] = useState({
    latitude: 90,
    longitude: 14.36,
    start: 20140101,
    end: 20170305,
    time_resolution: "YEAR",
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
