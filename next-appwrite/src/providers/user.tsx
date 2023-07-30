"use client";

import useGetUser from "@/hooks/user";
import { Action } from "@/types/user";
import { Models } from "appwrite";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const initialState = {
  isLoading: false,
  isError: false,
  user: null as null | Models.User<Models.Preferences>,
};

const UserContext = React.createContext({
  state: initialState,
  dispatch: (() => {}) as React.Dispatch<Action>,
});

export const useUser = () => React.useContext(UserContext);

const UserProvider = ({ children }: Props) => {
  const { state, dispatch } = useGetUser();

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
