import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to get the user from AsyncStorage
const loadUserFromStorage = async () => {
    try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null; // If there is no user info, return null
    } catch (error) {
        return null;
    }
}

// Initial state
const initialState = {
    user: null,
};


// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUserAction: (state, action) => {
            state.user = action.payload;
            AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logoutAction: (state, action) => {
            state.user = null;
            AsyncStorage.removeItem("userInfo");
        },
        setUserAction: (state, action) => {
            state.user = action.payload;
        }
    }
});

// Generate actions
export const { loginUserAction, logoutAction, setUserAction } = authSlice.actions;
// Generate reducer
export const authReducer = authSlice.reducers;
// Load user
export const loadUser = () => async (dispatch) => {
    const userInfo = await loadUserFromStorage();
    if (userInfo) {
        dispatch(setUserAction(userInfo));
    }
}