import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { loadUser } from "./authSlice";
import { useDispatch } from "react-redux";

const AppWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: "Home", headerShown: false }}
            />
            <Stack.Screen
                name="auth/login"
                options={{ title: "Inicio de sesión", headerShown: true }}
            />
            <Stack.Screen
                name="auth/register"
                options={{ title: "Registro de usuario", headerShown: true }}
            />
        </Stack>
    );
}

export default AppWrapper;