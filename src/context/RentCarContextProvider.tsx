import React, { useReducer, createContext, useContext, useEffect } from "react";
import { CarInterface } from "../interfaces";

interface InitialStateType {
  cart: null | CarInterface;
  totalPrice: number;
  checkout: boolean;
  rentedCars: CarInterface[];
}

type ACTIONTYPE =
  | { type: "ADD_TO_CART"; payload: CarInterface }
  | { type: "CHECKOUT"; payload: CarInterface }
  | { type: "REMOVE_ITEM"; payload: CarInterface };

const initialState: InitialStateType = {
  cart: null,
  totalPrice: 0,
  checkout: false,
  rentedCars: [],
};

const reducer = (
  state: InitialStateType,
  action: ACTIONTYPE
): InitialStateType => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
        checkout: false,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: null,
        checkout: false,
      };
    case "CHECKOUT":
      return {
        ...state,
        checkout: true,
        cart: null,
        rentedCars: [...state.rentedCars, action.payload],
      };
    default:
      return state;
  }
};

const rentCarContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<ACTIONTYPE>;
}>({
  state: initialState,
  dispatch: () => null,
});

const RentCarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localState = localStorage.getItem("state");
    return localState
      ? JSON.parse(localState)
      : {
          cart: null,
          totalPrice: 0,
          checkout: false,
          rentedCars: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <rentCarContext.Provider value={{ state, dispatch }}>
      {children}
    </rentCarContext.Provider>
  );
};

export default RentCarContextProvider;

export const useRentCar = () => {
  const { state, dispatch } = useContext(rentCarContext);
  return { state, dispatch };
};
