import { createStore } from "zustand";
import { Dish } from "@prisma/client";
import _ from "lodash";

export type localDishTypeAndDish = {
  id: string;
  name: string;
  dishes: Dish[];
};

export type localDishType = {
  id: string;
  name: string;
};

export type DishState = {
  localDishTypesAndDishes: localDishTypeAndDish[];
  currentDish: {
    dishTypeId: string;
    dish: Dish;
  };
};

export type DishActions = {
  setLocalDishTypesAndDishes: (
    localDishTypesAndDishes: DishState["localDishTypesAndDishes"]
  ) => void;
  setCurrentDish: (currentDish: DishState["currentDish"]) => void;
  updateOneInLocalDishes: (updatedDish: DishState["currentDish"]) => void;
  deleteOneInLocalDishes: (deletedDish: DishState["currentDish"]) => void;
  createOneInLocalDishTypes: (updatedDishType: localDishType) => void;
  deleteOneInLocalDishTypes: (deletedDishType: localDishTypeAndDish) => void;
};

export type DishStore = DishState & DishActions;

export const defaultInitialState: DishState = {
  localDishTypesAndDishes: [],
  currentDish: {
    dishTypeId: "",
    dish: {
      id: "",
      name: "",
      description: "",
      price: 0,
    },
  },
};

export const createDishStore = (initState: DishState = defaultInitialState) => {
  return createStore<DishStore>()((set) => ({
    ...initState,
    setLocalDishTypesAndDishes: (localDishTypesAndDishes) =>
      set({ localDishTypesAndDishes }),
    setCurrentDish: (currentDish) => set({ currentDish }),
    updateOneInLocalDishes: (updatedDish) =>
      set((state) => ({
        localDishTypesAndDishes: state.localDishTypesAndDishes.map(
          (element) => {
            // we filter out the old dish
            const dishes = element.dishes.filter(
              (dish) => dish.id !== updatedDish.dish.id
            );

            // we update dish list with new dish if the dishType is the same
            if (element.id === updatedDish.dishTypeId) {
              return {
                ...element,
                dishes: [...dishes, updatedDish.dish],
              };
            }

            return {
              ...element,
              dishes: [...dishes],
            };
          }
        ),
      })),
    deleteOneInLocalDishes: (deletedDish) =>
      set((state) => ({
        localDishTypesAndDishes: state.localDishTypesAndDishes.map(
          (element) => {
            // we filter out the old dish
            const dishes = element.dishes.filter(
              (dish) => dish.id !== deletedDish.dish.id
            );
            return {
              ...element,
              dishes: [...dishes],
            };
          }
        ),
      })),
    createOneInLocalDishTypes: (updatedDishType) =>
      set((state) => ({
        localDishTypesAndDishes: [
          ...state.localDishTypesAndDishes,
          {
            id: updatedDishType.id,
            name: updatedDishType.name,
            dishes: [],
          },
        ],
      })),
    deleteOneInLocalDishTypes: (deletedDishType) =>
      set((state) => ({
        localDishTypesAndDishes: [
          ...state.localDishTypesAndDishes.filter(
            (element) => element.id !== deletedDishType.id
          ),
        ],
      })),
  }));
};
