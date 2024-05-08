import { createStore } from "zustand";
import { Dish } from "@prisma/client";

export type DishState = {
  localDishTypesAndDishes: {
    id: string;
    name: string;
    dishes: Dish[];
  }[];
  currentDish: {
    dishTypeId: string;
    dishTypeName: string;
    dish: Dish;
  };
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
    currentDish: {
      dishTypeId: "",
      dishTypeName: "",
      dish: {
        id: "",
        name: "",
        price: 0,
        description: "",
      },
    },
  }
) =>
  createStore<DishStore>((set) => ({
    ...initialState,
    setdishTypesAndDishes: (localDishTypesAndDishes) =>
      set({ localDishTypesAndDishes }),
    setCurrentDish: (currentDish) => set({ currentDish }),
  }));
