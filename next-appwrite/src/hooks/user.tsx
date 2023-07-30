import api from "@/appwrite/config";
import { Action, State } from "@/types/user";
import { useEffect, useReducer } from "react";

export enum FetchState {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
}

function useGetUser() {
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        let user = null;
        if ("payload" in action) {
          user = action.payload;
        }
        return {
          ...state,
          isLoading: false,
          isError: false,
          user,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    user: null,
  });

  useEffect(() => {
    const getUser = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const user = await api.getUser();
        dispatch({ type: FetchState.FETCH_SUCCESS, payload: user });
      } catch (error) {
        console.log(error);
        dispatch({ type: FetchState.FETCH_FAILURE });
      }
    };

    getUser();
  }, []);

  return { state, dispatch };
}

export default useGetUser;
