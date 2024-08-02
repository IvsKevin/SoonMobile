import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../(services)/api/api";
import { loginUserAction } from '../(redux)/authSlice';
import { useDispatch, useSelector } from "react-redux";

// Esquema de validación
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido')
        .label("Email"),
    password: Yup.string()
        .min(6, 'La contraseña debe contener al menos 6 carácteres')
        .required('La contraseña es requerida')
        .label("Password"),
});

// Opciones para ocultar la barra de navegación
export const options = {
    headerShown: false,
};

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: loginUser,
        mutationKey: ['login'],
    });

    const [initialValues, setInitialValues] = useState({
        email: "ejemplo@gmail.com",
        password: "ejemploContrase",
    });

    useSelector((state) => console.log("Store data", state));
    console.log("mutation ", mutation);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Iniciar sesión</Text>
                    {mutation?.isError && <Text style={styles.errorText}>
                        {mutation?.error?.response?.data?.message}
                    </Text>}
                    {mutation?.isSuccess && <Text style={styles.successText}>
                        Inicio de sesión correctamente
                    </Text>}
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => {
                            console.log(values);
                            mutation
                                .mutateAsync(values)
                                .then((data) => {
                                    console.log("Data ", data);
                                    dispatch(loginUserAction(data));
                                    router.push("/(tabs)");
                                })
                                .catch((err) => {
                                    console.log("Error200: ", err);
                                });
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
                                        if (values.email === initialValues.email) {
                                            setFieldValue("email", "");
                                        }
                                    }}
                                />
                                {errors.email && touched.email ? (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                ) : null}
                                <Text style={styles.label}>Contraseña</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Contraseña"
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                    secureTextEntry
                                    onFocus={() => {
                                        if (values.password === initialValues.password) {
                                            setFieldValue("password", "");
                                        }
                                    }}
                                />
                                {errors.password && touched.password ? (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                ) : null}
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    {mutation?.isPending ? (<ActivityIndicator color="#fff" />) : (
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
        backgroundColor: '#f5f5f5', // Fondo claro para contraste
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#294a5f', // Color más oscuro para el título
        marginBottom: 24,
    },
    form: {
        width: '100%',
        backgroundColor: '#fff', // Fondo blanco para el formulario
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4, // Para sombra en Android
    },
    label: {
        fontSize: 18,
        color: '#2d6382', // Color medio para las etiquetas
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderColor: '#6398b9', // Color claro para los bordes de los inputs
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff', // Fondo blanco para los inputs
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    button: {
        height: 50,
        backgroundColor: '#2d6382', // Color medio para el botón
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff', // Texto blanco para contraste en el botón
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
        color: '#2d6382', // Color medio para los enlaces
        fontSize: 16,
        fontWeight: 'bold',
    },
});
