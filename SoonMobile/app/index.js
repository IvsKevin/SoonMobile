import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Video, ResizeMode } from 'expo-av';
import { useRouter } from "expo-router";
import { Asset } from 'expo-asset';

// Asegúrate de que el archivo trans.mp4 esté en la carpeta assets
const localVideo = Asset.fromModule(require('../assets/trans.mp4')).uri;

const Home = () => {
    const video = React.useRef(null);
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Video player */}
            <Video
                ref={video}
                style={styles.video}
                source={{ uri: localVideo }}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                volume={0.0}
            />
            {/* Overlay with text and buttons */}
            <View style={styles.overlay}>
                <Text style={styles.mainText}>Bienvenido a Soon</Text>
                <Text style={styles.subText}>El mejor sistema de transportes de Tijuana</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/auth/login")}
                    >
                        <Text style={styles.buttonText}>Comenzar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    mainText: {
        color: "white",
        fontSize: 38,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    subText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
        marginHorizontal: 20,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#6200ea",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        elevation: 3, // Adds a shadow effect on Android
        marginHorizontal: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
