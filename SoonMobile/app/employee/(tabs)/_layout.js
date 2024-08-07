import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import ProtectRoute from "../../../components/ProtectRoute";

export default function RootLayout() {
    return (
        <ProtectRoute >
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{
                        headerShown: false, title: "Inicio", tabBarIcon: ({ color }) => (
                            <FontAwesome name="map" size={24} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        headerShown: false, title: "Ajustes", tabBarIcon: ({ color }) => (
                            <FontAwesome name="cog" size={24} color={color} />
                        )
                    }}
                />
            </Tabs >
        </ProtectRoute>
    );
}