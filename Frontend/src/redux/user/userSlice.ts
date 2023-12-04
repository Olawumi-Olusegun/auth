import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentUser, UserState } from '../../types';

const initialState: UserState = {
    currentUser: null,
    isLoading: false,
    error: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.isLoading = true;
        },
        signUpSuccess: (state, action: PayloadAction<CurrentUser>) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = action.payload.message || "";
        },
        signUpFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        signInStart: (state) => {
            state.isLoading = true;
        },
        signInSuccess: (state, action: PayloadAction<CurrentUser>) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = action.payload.message || "";
        },
        signInFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        userUpdateStart: (state) => {
            state.isLoading = false;
            state.error = "";
        },
        userUpdateSuccess: (state, action: PayloadAction<CurrentUser>) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        userUpdateFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        userDeleteStart: (state) => {
            state.isLoading = false;
            state.error = "";
        },
        userDeleteSuccess: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = "";
        },
        userDeleteFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        userSignoutStart: (state) => {
            state.isLoading = false;
            state.error = "";
        },
        userSignoutSuccess: (state) => {
            state.currentUser = null;
            state.isLoading = false;
            state.error = "";
        },
        userSignoutFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});


export const { 
    signUpStart, 
    signUpSuccess, 
    signUpFailure, 

    signInStart, 
    signInSuccess, 
    signInFailure, 

    userUpdateStart, 
    userUpdateSuccess, 
    userUpdateFailure,

    userDeleteStart,
    userDeleteFailure,
    userDeleteSuccess,

    userSignoutStart,
    userSignoutFailure,
    userSignoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;