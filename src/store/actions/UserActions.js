export const UPDATE_STATE = 'USER_STATE_UPDATE';
export const RESET_USER_STATE = 'RESET_USER_STATE';

export const updateUserStates = (payload) => ({ type: UPDATE_STATE, payload });
export const resetUserStates = () => ({ type: RESET_USER_STATE });
