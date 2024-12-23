import React, { createContext, useState, useContext } from 'react';

const CardContext = createContext();

export function CardProvider({ children }) {
  const [visibleCardCount, setVisibleCardCount] = useState(8);

  const updateVisibleCardCount = (count) => {
    setVisibleCardCount(count);
  };

  return (
    <CardContext.Provider value={{ visibleCardCount, updateVisibleCardCount }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  return useContext(CardContext);
}
