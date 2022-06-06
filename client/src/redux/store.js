import { configureStore } from '@reduxjs/toolkit';
// Reducers
import appReducer from './reducers/appSlice';

export default configureStore({
  reducer: {
    app: appReducer
  }
});