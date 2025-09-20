export const UPDATE_APP_STATE = 'UPDATE_APP_STATE';
export const RESET_APP_STATE = 'RESET_APP_STATE';
export const UPDATE_LOADER = 'UPDATE_LOADER';

export const updateAppStates = payload => ({type: UPDATE_APP_STATE, payload});
export const enableLoader = () => ({type: UPDATE_LOADER, loader: true});
export const disableLoader = () => ({type: UPDATE_LOADER, loader: false});
export const resetAppStates = () => ({ type: RESET_APP_STATE });
