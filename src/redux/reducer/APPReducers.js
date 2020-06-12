import { combineReducers } from "redux";
import movieList from "./MovieSearchReducer";
import movieDetailedList from "./MovieDetailReducer";

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */
const appActionableReducerList = {
  //specificReducer:actionableReducerList(specificReducer)
};
const appReducerList = combineReducers({
  movieList: movieList,
  movieDetailedList: movieDetailedList,
});

const APPReducers = (state, action) => {
  return appReducerList(state, action);
};
export default APPReducers;
