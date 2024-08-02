import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../(services)/api/api";

// Esquema de validación
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Correo Electrónico").required("Requerido"),
  password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Requerido"),
});

export default function Register() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [initialValues, setInitialValues] = useState({
    email: "atom@gmail.com",
    password: "123456",
    confirmPassword: "123456",
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Registro</Text>
        {mutation?.isError ? (
          <Text style={styles.errorText}>
            {mutation?.error?.response?.data?.message}
          </Text>
        ) : null}
        {mutation?.isSuccess ? (
          <Text style={styles.successText}>
            El registro fue exitoso
          </Text>
        ) : null}
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            const data = {
              email: values.email,
              password: values.password,
            };
            mutation
              .mutateAsync(data)
              .then(() => {
                setMessage("Registro completado!");
                setMessageType("success");
                setTimeout(() => {
                  setMessage("");
                  router.push("/(tabs)");
                }, 1000); // Redirect after 1 seconds
              })
              .catch((error) => {
                setMessage(error?.response?.data?.message);
                setMessageType("error");
              });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
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
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
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
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry
                onFocus={() => {
                  if (values.confirmPassword === initialValues.confirmPassword) {
                    setFieldValue("confirmPassword", "");
                  }
                }}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={mutation.isLoading}
              >
                {mutation.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Registrarme</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.linkContainer}>
          <Text>¿Ya tienes cuenta?</Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.linkText}>¡Inicia sesión!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#294a5f", // Color oscuro para el título
    marginBottom: 24,
  },
  form: {
    width: "100%",
    backgroundColor: "#fff", // Fondo blanco para el formulario
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // Para sombra en Android
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d6382", // Color medio para las etiquetas
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#6398b9", // Color claro para los bordes de los inputs
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff", // Fondo blanco para los inputs
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  successText: {
    color: "green",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#2d6382", // Color medio para el botón
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff", // Texto blanco para contraste en el botón
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    marginLeft: 8,
  },
  linkText: {
    color: "#2d6382", // Color medio para los enlaces
    fontSize: 16,
    fontWeight: "bold",
  }
});
