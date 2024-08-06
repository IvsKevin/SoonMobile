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
            {/* Aquí no es necesario definir la pantalla index si se dirige directamente a las pestañas */}
        </Stack>
    );
}

export default AppWrapper;
