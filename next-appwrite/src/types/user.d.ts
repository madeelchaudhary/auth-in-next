import { FetchState } from "./user";

declare interface State {
  isLoading: boolean;
  isError: boolean;
  user: any;
}

type Action =
  | { type: FetchState.FETCH_INIT }
  | { type: FetchState.FETCH_SUCCESS; payload: any }
  | { type: FetchState.FETCH_FAILURE };
