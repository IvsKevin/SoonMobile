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
                        headerShown: false, title: "Tablero", tabBarIcon: ({ color }) => (
                            <FontAwesome name="bar-chart" size={24} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="stations"
                    options={{
                        headerShown: false, title: "Estaciones", tabBarIcon: ({ color }) => (
                            <FontAwesome name="bus" size={24} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="routes"
                    options={{
                        headerShown: false, title: "Rutas", tabBarIcon: ({ color }) => (
                            <FontAwesome name="map-o" size={24} color={color} />
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