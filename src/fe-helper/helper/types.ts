export type MessageHelperState = {
  title?: string, 
  message?: string,
  mode?: 'message',
  type?: 'warn' | 'info' | 'confirm' | 'error' | 'success',
  value?: Record<string, any>
}
export type HelperState = {
  message?: MessageHelperState,
  askingBeforeRoute?: boolean
}
export enum MessageHelperActionTypes {
  SHOW_MESSAGE = '@@COMMON/SHOW_MESSAGE',
  CLEAR_MESSAGE = '@@COMMON/CLEAR_MESSAGE',
  ASK_BEFORE_ROUTE = '@@COMMON/ASK_BEFORE_ROUTE',
  CLEAR_ASKING_BEFORE_ROUTE = '@@COMMON/CLEAR_ASKING_BEFORE_ROUTE'
}