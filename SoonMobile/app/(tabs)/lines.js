import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Lines = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                />
                <TouchableOpacity style={styles.locationButton}>
                    <Text style={styles.locationText}>📍</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.headerOptions}>
                    <Text style={styles.headerText}>Todas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerOptions}>
                    <Text style={styles.headerText}>Favoritas</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.lineContainer}>
                <Text style={styles.lineText}>Linea: Todas las lineas</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Icon name="ellipsis-v" size={20} color="#333" />
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.bodyLines}>
                    <View style={[styles.lineIndicator, { backgroundColor: 'blue' }]} />
                    <Text style={styles.bodyText}>Linea 1 - Transporte Azul</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bodyLines}>
                    <View style={[styles.lineIndicator, { backgroundColor: 'red' }]} />
                    <Text style={styles.bodyText}>Linea 2 - Transporte Rojo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bodyLines}>
                    <View style={[styles.lineIndicator, { backgroundColor: 'yellow' }]} />
                    <Text style={styles.bodyText}>Linea 3 - Transporte Amarillo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Lines;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    locationButton: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 20,
    },
    locationText: {
        fontSize: 20,
    },
    settingsButton: {
        padding: 5,
        paddingHorizontal: 15,
        backgroundColor: '#eee',
        borderRadius: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
        paddingVertical: 10,
    },
    headerOptions: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 3,
    },
    headerText: {
        fontSize: 16,
        color: '#333',
    },
    lineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#e0e0e0',
        marginVertical: 5,
    },
    lineText: {
        fontSize: 16,
        color: '#333',
    },
    lineOptions: {
        fontSize: 18,
        color: '#333',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    bodyLines: {
        width: '95%',
        backgroundColor: '#e2e2e2',
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    lineIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    bodyText: {
        fontSize: 16,
        color: '#333',
    },
});
