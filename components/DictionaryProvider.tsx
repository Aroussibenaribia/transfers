"use client";

import React, { createContext, useContext } from 'react';

type Dictionary = Record<string, any>; // Relaxed type for easy access

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({ dictionary, children }: { dictionary: Dictionary, children: React.ReactNode }) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const dictionary = useContext(DictionaryContext);
  if (!dictionary) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return dictionary;
}
