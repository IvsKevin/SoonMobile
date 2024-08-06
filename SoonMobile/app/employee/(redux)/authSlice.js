import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to get the user from AsyncStorage
const loadUserFromStorage = async () => {
    try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null; // If there is no user info, return null
    } catch (error) {
        console.error('Error loading user from storage:', error);
        return null;
    }
}

// Initial state
const initialState = {
    user: null,
    isLoading: true,
};

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUserAction: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            AsyncStorage.setItem("userInfo", JSON.stringify(action.payload)); // Asegúrate de que action.payload contenga el id
        },        
        logoutAction: (state) => {
            state.isLoading = false;
            state.user = null;
            AsyncStorage.removeItem("userInfo");
        },
        setUserAction: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        }
    }
});

// Generate actions
export const { loginUserAction, logoutAction, setUserAction } = authSlice.actions;
// Generate reducer
export const authReducer = authSlice.reducer;
// Load user
export const loadUser = () => async (dispatch) => {
    const userInfo = await loadUserFromStorage();
    if (userInfo) {
        dispatch(setUserAction(userInfo));
    } else {
        console.error('No user info found in AsyncStorage');
    }
}