import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const Paragraph = ({ children }) => (
  <Text style={styles.paragraph}>{children}</Text>
);

const Link = ({ url, children }) => (
  <TouchableOpacity onPress={() => Linking.openURL(url)}>
    <Text style={styles.link}>{children}</Text>
  </TouchableOpacity>
);

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Acerca de Soon</Text>
      
      <SectionTitle>Descripción de la Aplicación</SectionTitle>
      <Paragraph>
        Soon es una aplicación innovadora diseñada para mejorar la gestión del transporte público, proporcionando a los usuarios información en tiempo real sobre la ubicación y horarios de los vehículos. Con Soon, los usuarios pueden:
      </Paragraph>
      <Paragraph>• Consultar la ubicación actual de los vehículos de transporte público.</Paragraph>
      <Paragraph>• Recibir notificaciones sobre llegadas y salidas.</Paragraph>
      <Paragraph>• Planificar rutas eficientes utilizando datos actualizados.</Paragraph>
      <Paragraph>• Reportar incidencias y recibir soporte en tiempo real.</Paragraph>
      
      <SectionTitle>Historia y Misión</SectionTitle>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Historia:</Text> Soon nació de la visión de <Text style={styles.subSectionTitle}>Axis Development</Text> de transformar la experiencia del transporte público. Desde su fundación, Axis Development ha trabajado arduamente para crear soluciones de software que mejoren la vida cotidiana de las personas. Soon es el resultado de años de investigación y desarrollo dedicados a entender las necesidades de los usuarios del transporte público.
      </Paragraph>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Misión:</Text> Nuestra misión es proporcionar una herramienta que facilite y optimice el uso del transporte público, reduciendo tiempos de espera y mejorando la eficiencia del servicio. Nos esforzamos por crear una experiencia de transporte más cómoda y accesible para todos.
      </Paragraph>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Visión:</Text> Ser la plataforma líder en la gestión del transporte público, contribuyendo a la creación de ciudades más inteligentes y sostenibles.
      </Paragraph>
      
      <SectionTitle>Equipo</SectionTitle>
      <Paragraph>
        Nuestro equipo está compuesto por profesionales apasionados y dedicados que trabajan incansablemente para hacer de Soon una aplicación de clase mundial.
      </Paragraph>
      <Paragraph>• Brian Bautista: Fundador y CEO. Lidera la visión y la dirección estratégica del proyecto.</Paragraph>
      <Paragraph>• Luis Islas: Jefa de Desarrollo. Responsable del diseño y desarrollo de las funcionalidades de la aplicación.</Paragraph>
      <Paragraph>• Kevin Perdomo: Ingeniero de Software. Especialista en backend y bases de datos.</Paragraph>
      <Paragraph>• Luis Islas: Diseñadora UI/UX. Encargada del diseño de la interfaz y la experiencia del usuario.</Paragraph>
      
      <SectionTitle>Versiones de la Aplicación</SectionTitle>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Versión Actual:</Text> Soon 1.0.0
      </Paragraph>
      <Paragraph>• Implementación de funciones básicas de seguimiento en tiempo real.</Paragraph>
      <Paragraph>• Notificaciones de llegada y salida.</Paragraph>
      <Paragraph>• Planificación de rutas.</Paragraph>
      <Paragraph>• Reporte de incidencias.</Paragraph>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Historial de Versiones:</Text>
      </Paragraph>
      <Paragraph>• 0.9.0: Versión Beta pública.</Paragraph>
      <Paragraph>• 0.8.0: Pruebas internas de seguimiento en tiempo real.</Paragraph>
      <Paragraph>• 0.7.0: Desarrollo inicial de la interfaz de usuario.</Paragraph>
      
      <SectionTitle>Licencias y Créditos</SectionTitle>
      <Paragraph>
        Soon utiliza una variedad de bibliotecas de software de terceros para proporcionar su funcionalidad:
      </Paragraph>
      <Paragraph>• React Native: Para la construcción de la aplicación móvil.</Paragraph>
      <Paragraph>• Expo Router: Para la gestión de la navegación.</Paragraph>
      <Paragraph>• Formik y Yup: Para la validación y gestión de formularios.</Paragraph>
      <Paragraph>• Mapbox: Para los servicios de mapas y geolocalización.</Paragraph>
      <Paragraph>
        Agradecemos a todos los desarrolladores y proyectos de código abierto que han contribuido a la creación de Soon.
      </Paragraph>
      
      <SectionTitle>Contacto y Soporte</SectionTitle>
      <Paragraph>
        Para soporte y retroalimentación, puedes contactarnos en:
      </Paragraph>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Correo Electrónico:</Text> axisdev.tft@gmail.com
      </Paragraph>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Teléfono:</Text> +52 (664) 756-9880
      </Paragraph>
      <Paragraph>
        <Text style={styles.subSectionTitle}>Redes Sociales:</Text>
      </Paragraph>
      <Link url="https://www.facebook.com/profile.php?id=61556283670646">Facebook</Link>
      <Link url="https://x.com/AxisDeveloper_s">Twitter</Link>

      <Text></Text>
      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 35,
    margin: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d6382',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#2d6382',
  },
  subSectionTitle: {
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  link: {
    fontSize: 16,
    marginTop: 8,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});
