"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type DishStore, createDishStore } from "@/store/dish-store";

const DishStoreContext = createContext<StoreApi<DishStore> | null>(null);
export interface dishStoreProviderProps {
  children: ReactNode;
}

export const DishStoreProvider = ({ children }: dishStoreProviderProps) => {
  const storeRef = useRef<StoreApi<DishStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createDishStore();
  }

  return (
    <DishStoreContext.Provider value={storeRef.current}>
      {children}
    </DishStoreContext.Provider>
  );
};

export const useDishStore = <T,>(selector: (store: DishStore) => T): T => {
  const counterStoreContext = useContext(DishStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
