import { createStore } from "zustand/vanilla";
import { Dish, DishType } from "@prisma/client";

export type DishState = {
  localDishes: Dish[];
  localDishTypes: DishType[];
  currentDish: Dish;
};

export type DishActions = {
  setLocalDishes: (localDishes: Dish[]) => void;
  setLocalDishTypes: (localDishTypes: DishType[]) => void;
  setCurrentDish: (currentDish: Dish | undefined) => void;
  updateOneInLocalDishes: (updatedDish: Dish) => void;
  deleteOneInLocalDishes: (deletedDish: Dish) => void;
};

export type DishStore = DishState & DishActions;

export const defaultInitialState: DishState = {
  localDishes: [],
  localDishTypes: [],
  currentDish: {
    id: "",
    name: "",
    description: "",
    price: 0,
    dishTypeId: "",
  },
};

export const createDishStore = (
  initialState: DishState = defaultInitialState
) => {
  return createStore<DishStore>((set) => ({
    ...initialState,
    setLocalDishes: (localDishes) => set({ localDishes }),
    setLocalDishTypes: (localDishTypes) => set({ localDishTypes }),
    setCurrentDish: (currentDish) => set({ currentDish }),
    updateOneInLocalDishes: (updatedDish) =>
      set((state) => ({
        localDishes: [
          ...state.localDishes.map((dish) =>
            dish.id === updatedDish.id ? updatedDish : dish
          ),
        ],
      })),
    deleteOneInLocalDishes: (deletedDish) =>
      set((state) => ({
        localDishes: [
          ...state.localDishes.filter((dish) => dish.id !== deletedDish.id),
        ],
      })),
  }));
};
