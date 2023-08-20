import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './types';

export const login = (userData) => (dispatch) => {
  // Simulate login API call
  // Replace this with actual authentication logic
  // For now, assuming login is successful
  dispatch({
    type: LOGIN_SUCCESS,
    payload: userData,
  });
};

export const register = (userData) => (dispatch) => {
  // Simulate registration API call
  // Replace this with actual registration logic
  // For now, assuming registration is successful
  dispatch({
    type: REGISTER_SUCCESS,
    payload: userData,
  });
};
