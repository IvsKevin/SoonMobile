import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminHome = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido, Administrador!</Text>
            {/* Aquí puedes agregar el contenido de la vista principal */}
        </View>
    );
};

export default AdminHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});