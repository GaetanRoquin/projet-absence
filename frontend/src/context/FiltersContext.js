'use client'
import { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [search, setSearch]   = useState('');
  const [classe, setClasse]   = useState('');
  const [justifie, setJustifie] = useState('');  // 'oui' | 'non' | ''

  return (
    <FiltersContext.Provider value={{ search, setSearch, classe, setClasse, justifie, setJustifie }}>
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => useContext(FiltersContext);
