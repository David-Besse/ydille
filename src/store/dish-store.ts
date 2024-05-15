import { createStore } from "zustand";
import _ from "lodash";

type localDish = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type localDishType = {
  id: string;
  name: string;
};

type localDishAndDishTypeList = {
  dishType: localDishType;
  dishes: localDish[];
}[];

type currentDishAndDishType = {
  dishType: localDishType;
  dish: localDish;
};

type DishState = {
  localDishAndDishTypeList: localDishAndDishTypeList;
  currentDishAndDishType: currentDishAndDishType;
};

export type DishActions = {
  setLocalDishAndDishTypeList: (
    dishAndDishTypeList: localDishAndDishTypeList
  ) => void;
  setCurrentDishAndDishType: (currentDish: currentDishAndDishType) => void;
  updateDishInState: (updatedDish: currentDishAndDishType) => void;
  deleteDishInState: (deletedDish: currentDishAndDishType) => void;
  createDishTypeInState: (createdDishType: currentDishAndDishType) => void;
  deleteDishTypeInState: (deletedDishType: currentDishAndDishType) => void;
};

export type DishStore = DishState & DishActions;

export const defaultInitialState: DishState = {
  localDishAndDishTypeList: [],
  currentDishAndDishType: {
    dishType: {
      id: "",
      name: "",
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

    setLocalDishAndDishTypeList: (localDishAndDishTypeList) =>
      set({ localDishAndDishTypeList }),

    setCurrentDishAndDishType: (currentDishAndDishType) =>
      set({ currentDishAndDishType }),

    updateDishInState: (updatedDish) =>
      set((state) => ({
        localDishAndDishTypeList: state.localDishAndDishTypeList.map(
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
        localDishAndDishTypeList: state.localDishAndDishTypeList.map(
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

    createDishTypeInState: (updatedDishType) =>
      set((state) => ({
        localDishAndDishTypeList: [
          ...state.localDishAndDishTypeList,
          {
            dishType: updatedDishType.dishType,
            dishes: [],
          },
        ],
      })),

    deleteDishTypeInState: (deletedDishType) =>
      set((state) => ({
        localDishAndDishTypeList: [
          ...state.localDishAndDishTypeList.filter(
            (element) => element.dishType.id !== deletedDishType.dishType.id
          ),
        ],
      })),
  }));
};
