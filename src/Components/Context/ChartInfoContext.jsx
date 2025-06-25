import { createContext, useState } from "react";

export const MainContext = createContext();

function ChartInfoContext({ children }) {
  const [chartInfo, setChartInfo] = useState(null);
  const [selectdate, setSelectdate] = useState(null); 

  const value = {
    chartInfo,
    setChartInfo,
    selectdate,      
    setSelectdate,   
  };

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
}

export default ChartInfoContext;
