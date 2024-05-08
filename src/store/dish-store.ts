import { createStore } from "zustand";
import { Dish } from "@prisma/client";

export type DishState = {
  localDishTypesAndDishes: {
    id: string | undefined;
    name: string;
    dishes: Dish[];
  }[];
  currentDish: Dish | undefined;
};

export type DishStore = DishState & {
  setdishTypesAndDishes: (
    localDishTypesAndDishes: DishState["localDishTypesAndDishes"]
  ) => void;
  setCurrentDish: (currentDish: DishStore["currentDish"]) => void;
};

export const createDishStore = (
  initialState: DishState = {
    localDishTypesAndDishes: [],
    currentDish: undefined,
  }
) =>
  createStore<DishStore>((set) => ({
    ...initialState,
    setdishTypesAndDishes: (localDishTypesAndDishes) =>
      set({ localDishTypesAndDishes }),
    setCurrentDish: (currentDish) => set({ currentDish }),
  }));
