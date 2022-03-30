import { createAction } from '@reduxjs/toolkit';
import { MessageHelperActionTypes, MessageHelperState } from './types';

export const showMessage = createAction<MessageHelperState>(
  MessageHelperActionTypes.SHOW_MESSAGE
);
export const clearMessage = createAction<void>(
  MessageHelperActionTypes.CLEAR_MESSAGE
);
export const askBeforeRoute = createAction<void>(
  MessageHelperActionTypes.ASK_BEFORE_ROUTE
);
export const clearAskingBeforeRoute = createAction<void>(
  MessageHelperActionTypes.CLEAR_ASKING_BEFORE_ROUTE
);