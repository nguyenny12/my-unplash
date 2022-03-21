import { configureStore } from '@reduxjs/toolkit';
import photoReducer from 'features/photo/photoSlice';

export default configureStore({
  reducer: {
    photo: photoReducer,
  },
});
