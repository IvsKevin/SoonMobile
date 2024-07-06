import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'expo-router'
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../(services)/api/api";
import { loginUserAction } from '../(redux)/authSlice'
import { useDispatch, useSelector } from "react-redux";

//Schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .label("Email"),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
        .label("Password"),
})

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch(); // Use dispatch
    const mutation = useMutation({
        mutationFn: loginUser,
        mutationKey: ['login']
    })

    useSelector((state) => console.log("Store data", state));
    console.log("mutation ", mutation);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {/* Display messages */}
            {mutation?.isError && <Text style={styles.errorText}>
                {mutation?.error?.response?.data?.message}
            </Text>}
            {mutation?.isSuccess && <Text style={styles.successText}>
                Logueado correctamente
            </Text>}
            {/* Formik Configuration */}
            <Formik
                initialValues={{ email: "emma@gmail.com", password: "emma123" }}
                onSubmit={(values) => {
                    console.log(values)
                    // Calling mutation
                    mutation
                        .mutateAsync(values)
                        .then((data) => {
                            // Calling mutation
                            // mutation.mutateAsync(values).then((data) => {
                            console.log("Data ", data);
                            // }).catch((error) => {
                            //     console.log(error);
                            // })

                            // Dispatch
                            dispatch(loginUserAction(data));
                            router.push("/(tabs)")
                        })
                        .catch((err) => {
                            console.log("Error200: ", err);
                        });
                }}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {/* Error */}
                        {errors.email && touched.email ? (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        ) : null}
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry
                        />
                        {errors.password && touched.password ? (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        ) : null}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            {mutation?.isPending ? (<ActivityIndicator color="#fff" />) : (
                                <Text style={styles.buttonText}>Login</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 24,
    },
    form: {
        width: "100%",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    errorText: {
        color: "red",
        marginBottom: 16,
    },
    button: {
        height: 50,
        backgroundColor: "#6200ea",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    successText: {
        color: "green",
        marginBottom: 16,
    },
});