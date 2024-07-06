import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";

const ProtectRoute = ({ children }) => {
    const router = useRouter();
    const {user, isLoading} = useSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
           router.push("/auth/login");
        }
    }, [user]);

    if(isLoading) {
        return <ActivityIndicator size="large" />;
    }
    if(!user) return null;
    return children;
}

export default ProtectRoute;