import { createStore } from "zustand";
import _ from "lodash";

export type localDish = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export type localDishType = {
  id: string;
  name: string;
  order: number;
};

export type localDishesAndDishTypesList = {
  dishes: localDish[];
  dishType: localDishType;
}[];

export type currentDishAndDishType = {
  dish: localDish;
  dishType: localDishType;
};

export type DishState = {
  localDishesAndDishTypesList: localDishesAndDishTypesList;
  currentDishAndDishType: currentDishAndDishType;
};

export type DishActions = {
  setLocalDishesAndDishTypesList: (
    dishesAndDishTypesList: localDishesAndDishTypesList
  ) => void;
  setCurrentDishAndDishType: (currentDish: currentDishAndDishType) => void;
  updateDishInState: (updatedDish: currentDishAndDishType) => void;
  deleteDishInState: (deletedDish: currentDishAndDishType) => void;
  createDishTypeInState: (createdDishType: localDishType) => void;
  deleteDishTypeInState: (deletedDishType: localDishType) => void;
  updateDishTypeInState: (updatedDishType: localDishType) => void;
};

export type DishStore = DishState & DishActions;

export const defaultInitialState: DishState = {
  localDishesAndDishTypesList: [],
  currentDishAndDishType: {
    dishType: {
      id: "",
      name: "",
      order: 0,
    },
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

    setLocalDishesAndDishTypesList: (localDishesAndDishTypesList) =>
      set({ localDishesAndDishTypesList: localDishesAndDishTypesList }),

    setCurrentDishAndDishType: (currentDishAndDishType) =>
      set({ currentDishAndDishType }),

    updateDishInState: (updatedDish) =>
      set((state) => ({
        localDishesAndDishTypesList: state.localDishesAndDishTypesList.map(
          (element) => {
            // we filter out the old dish
            const dishes = element.dishes.filter(
              (dish) => dish.id !== updatedDish.dish.id
            );

            // we update dish list with new dish
            if (element.dishType.id === updatedDish.dishType.id) {
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

    deleteDishInState: (deletedDish) =>
      set((state) => ({
        localDishesAndDishTypesList: state.localDishesAndDishTypesList.map(
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

    createDishTypeInState: (createdDishType) =>
      set((state) => ({
        localDishesAndDishTypesList: [
          ...state.localDishesAndDishTypesList,
          {
            dishType: createdDishType,
            dishes: [],
          },
        ],
      })),

    deleteDishTypeInState: (deletedDishType) =>
      set((state) => ({
        localDishesAndDishTypesList: [
          ...state.localDishesAndDishTypesList.filter(
            (element) => element.dishType.id !== deletedDishType.id
          ),
        ],
      })),

    updateDishTypeInState: (updatedDishType) =>
      set((state) => ({
        localDishesAndDishTypesList: state.localDishesAndDishTypesList.map(
          (element) => {
            if (element.dishType.id === updatedDishType.id) {
              return {
                ...element,
                dishType: updatedDishType,
              };
            }
            return element;
          }
        ),
      })),
  }));
};
