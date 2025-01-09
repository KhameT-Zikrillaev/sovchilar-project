import React, { createContext, useState, useContext } from "react";

const CardContext = createContext();

export function CardProvider({ children }) {
  const [visibleCardCount, setVisibleCardCount] = useState(() => {
    const savedCount = localStorage.getItem("visibleCardCount");
    return savedCount ? parseInt(savedCount) : 8;
  });

  const updateVisibleCardCount = (count) => {
    setVisibleCardCount(count);
    localStorage.setItem("visibleCardCount", count.toString());
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
