'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { getStatsGlobal, getHighRisk } from '@/utils/api';

const GlobalStatsContext = createContext();

export function GlobalStatsProvider({ children }) {
  const [stats, setStats]       = useState(null);
  const [highRisk, setHighRisk] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [s, h] = await Promise.all([getStatsGlobal(), getHighRisk()]);
      setStats(s);
      setHighRisk(h);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <GlobalStatsContext.Provider value={{ stats, highRisk, loading }}>
      {children}
    </GlobalStatsContext.Provider>
  );
}

export const useGlobalStats = () => useContext(GlobalStatsContext);
