import axios from "axios";

// Create a function to return a promise
const api = "https://few-pots-suffer.loca.lt";
export const registerUser = async (user) => {
    console.log(user);
    const response = await axios.post(
        api + "/api/users/register",
        user,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
export const loginUser = async (user) => {
    const response = await axios.post(
        api + "/api/users/login",
        user,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};