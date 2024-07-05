const { Stack } = require("expo-router");

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: "Home" }}
            />
        </Stack>
    );
}