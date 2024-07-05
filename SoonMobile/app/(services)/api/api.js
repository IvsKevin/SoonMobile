import axios from "axios";

// Create a function to return a promise

// Login
const loginUser = async ({email, password}) => {
    const response = await axios.post(
        "https://cruel-badgers-return.loca.lt/api/users/login",
        {
            email,
            password,
        }
    );
    // Returning a promise
    return response.data;
}

// Register
const registerUser = async ({email, password}) => {
    const response = await axios.post(
        "https://cruel-badgers-return.loca.lt/api/users/register",
        {
            email,
            password,
        }
    );
    // Returning a promise
    return response.data;
}

export { loginUser, registerUser };