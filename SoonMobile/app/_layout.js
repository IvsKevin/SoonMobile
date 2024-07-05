const { Stack } = require("expo-router");
import queryClient from "./(services)/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false, title: "Home" }}
                />
            </Stack>
        </QueryClientProvider>

    );
}