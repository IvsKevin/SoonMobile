import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginUserAction } from '../(redux)/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Esquema de validación
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido')
        .label("Email"),
    password: Yup.string()
        .min(6, 'La contraseña debe contener al menos 6 caracteres')
        .required('La contraseña es requerida')
        .label("Password"),
});

// Opciones para ocultar la barra de navegación
export const options = {
    headerShown: false,
};

// Función para realizar el login
const loginUser = async (credentials) => {
    const params = new URLSearchParams();
    params.append('email', credentials.email);
    params.append('password', credentials.password);

    const response = await fetch('https://soon-api.azurewebsites.net/api/User/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
    });

    if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
    }

    const data = await response.json();
    
    console.log('Datos recibidos:', data);

    if (data.status === 0 && data.user) {
        return data;
    } else {
        throw new Error('Error: No se recibió la información del usuario');
    }
};

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    // Usa useMutation y maneja errores
    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(loginUserAction(data.user));
            router.push("/(tabs)");
        },
        onError: (error) => {
            console.log("Error en el login:", error.message);
        }
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Iniciar sesión</Text>
                    {mutation.isError && <Text style={styles.errorText}>
                        {mutation.error.message}
                    </Text>}
                    {mutation.isSuccess && <Text style={styles.successText}>
                        Inicio de sesión correctamente
                    </Text>}
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={(values) => {
                            mutation.mutate(values);
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                            <View style={styles.form}>
                                <Text style={styles.label}>Correo Electrónico</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Correo electrónico"
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                    onFocus={() => {
                                        if (values.email === "") {
                                            setFieldValue("email", "");
                                        }
                                    }}
                                />
                                {errors.email && touched.email ? (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                ) : null}
                                <Text style={styles.label}>Contraseña</Text>
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Contraseña"
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                        secureTextEntry={!showPassword}
                                        onFocus={() => {
                                            if (values.password === "") {
                                                setFieldValue("password", "");
                                            }
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Icon
                                            name={showPassword ? "eye" : "eye-off"}
                                            size={24}
                                            color="#2d6382" // Ajusta el color a tu gusto
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && touched.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    {mutation.isLoading ? (<ActivityIndicator color="#fff" />) : (
                                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                                    )}
                                </TouchableOpacity>
                                <View style={styles.linkContainer}>
                                    <Text>¿Aún no tienes cuenta?</Text>
                                    <TouchableOpacity
                                        style={styles.link}
                                        onPress={() => router.push("/auth/register")}
                                    >
                                        <Text style={styles.linkText}>Regístrate</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#294a5f',
        marginBottom: 24,
    },
    form: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    label: {
        fontSize: 18,
        color: '#2d6382',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#6398b9',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#6398b9",
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 16,
        paddingRight: 1, 
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        padding: 10,
        top: 4,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    button: {
        height: 50,
        backgroundColor: '#2d6382',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    successText: {
        color: 'green',
        marginBottom: 16,
    },
    linkContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        marginLeft: 8,
    },
    linkText: {
        color: '#2d6382',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
