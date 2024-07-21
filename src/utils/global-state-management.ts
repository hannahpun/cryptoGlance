import { createContext, Dispatch, Reducer } from "react";
import { ITokenContrast } from "@/types/asset.type";

/**
 * Reducer 的動作類型
 */
export type ReducerActionType = "SET_ASSETS" | "SET_TOAST";

export type GlobalState = {
  assets: Array<ITokenContrast> | [];
  dispatch: Dispatch<ReducerAction>;
};

/**
 * Reducer 接收的狀態
 */
export type ReducerState = Omit<GlobalState, "dispatch">;

/**
 * Reducer 的動作參數類型
 */
export type ReducerAction = {
  type: ReducerActionType;
  payload: ReducerState[keyof ReducerState];
};

/**
 * 處理全域狀態的函式
 *
 * @param state 要處理的狀態
 * @param action 要執行的動作
 * @returns
 */
export const reducer: Reducer<ReducerState, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_ASSETS":
      state = { ...state, assets: action.payload as Array<Assets> | null };
      break;
    default:
      throw new Error("Invalid action type");
  }
  return state;
};

/**
 * 建立全域狀態的 Context
 */
export const GlobalContext = createContext<GlobalState>({
  // products: [],
  // orders: [],
  assets: [],
  dispatch: () => null,
});
