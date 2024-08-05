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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el icono

// Esquema de validación
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Correo Electrónico").required("Requerido"),
  password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Requerido"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Requerido"),
});

// Función para registrar el usuario
const registerUser = async (data) => {
  const response = await fetch('https://soon-api.azurewebsites.net/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data).toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al registrar usuario');
  }

  return response.json();
};

export default function Register() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Valores iniciales vacíos
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Registro</Text>
        {message ? (
          <Text style={messageType === "error" ? styles.errorText : styles.successText}>
            {message}
          </Text>
        ) : null}
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values, { setSubmitting }) => {
            const data = {
              email: values.email,
              password: values.password,
              type: 3,
            };
            registerUser(data)
              .then(() => {
                setMessage("Registro completado!");
                setMessageType("success");
                setTimeout(() => {
                  setMessage("");
                  router.push("/(tabs)");
                }, 1000); // Redirect after 1 second
              })
              .catch((error) => {
                setMessage(error.message);
                setMessageType("error");
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Correo Electrónico</Text>
              <TextInput
                style={styles.input}
                placeholder="example@axisdev.com"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
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
              <Text style={styles.label}>Confirma tu contraseña</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirma tu contraseña"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={24}
                    color="#2d6382" // Ajusta el color a tu gusto
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && touched.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
    fontSize: 20,
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
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea verticalmente los elementos
    borderColor: "#6398b9", // Color claro para los bordes de los inputs
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    paddingRight: 1, // Espacio para el ícono
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
    top: 4,
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
