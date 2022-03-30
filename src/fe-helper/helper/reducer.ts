import { createReducer } from "@reduxjs/toolkit";
import { askBeforeRoute, clearAskingBeforeRoute, clearMessage, showMessage } from "./action";
import { HelperState } from './types';


const initialState: HelperState = {
}

const reducer = createReducer(initialState, (builder) => {
  return builder
    //Show message
    .addCase(showMessage, (state, action) => {
      state.message = action?.payload;
    })
    // clear message
    .addCase(clearMessage, (state) => {
      delete state.message;
    })
    .addCase(askBeforeRoute, (state) => {
      state.askingBeforeRoute = true;
    })
    .addCase(clearAskingBeforeRoute, (state) => {
      delete state.askingBeforeRoute;
    })
  
});

export default reducer;
export { initialState as helperInitialState };

