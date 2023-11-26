import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const initialState = {
  name: '',
  email: '',
  id: '',
  image: '',
  details: [],
  friend: [],
  loading: false,
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addName: (state, action) => {
      state.name = action.payload;
    },
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addImage: (state, action) => {
      state.image = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateId: (state, action) => {
      state.id = action.payload;
    },
    addDetail: (state, action) => {
      state.details.push(action.payload);
    },
    removeDetail: (state, action) => {
      const index = state.details.findIndex(
        (detail) => detail.id === action.payload
      );
      if (index !== -1) {
        state.details.splice(index, 1);
      }
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    addFriend: (state, action) => {
      state.friend = action.payload;
    },    
    resetState: () => initialState,
  },
});

export const {
  addName,
  addEmail,
  addImage,
  setLoading,
  updateId,
  addDetail,
  removeDetail,
  setIsLogin,
  addFriend,
  resetState,
} = userSlice.actions;

export const selectLoading = (state) => state.userData.loading;
export const selectIsLogin = (state) => state.userData.isLogin;

export default userSlice.reducer;
