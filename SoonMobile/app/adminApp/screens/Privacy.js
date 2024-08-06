import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';

// Datos
const data = [
  { id: '1', title: 'Información de Contacto: Nombre, dirección de correo electrónico, número de teléfono, y otra información de contacto proporcionada al registrarse o al utilizar nuestros servicios.' },
  { id: '2', title: 'Información del Usuario: Datos sobre el uso de nuestras plataformas, incluidas las interacciones con nuestros servicios, registros de acceso y configuraciones personalizadas.' },
  { id: '3', title: 'Información Financiera: Detalles de pago y facturación necesarios para procesar transacciones.' },
  { id: '4', title: 'Datos Técnicos: Información sobre el dispositivo y la conexión a internet, como la dirección IP, el tipo de navegador y el sistema operativo.' },
];

const usoDeInfo = [
  { id: '1', title: 'Proveer y Mejorar Nuestros Servicios: Para ofrecer, operar y mejorar nuestras soluciones de software.'},
  { id: '2', title: 'Procesar Transacciones: Para gestionar y procesar pagos y facturación.'},
  { id: '3', title: 'Comunicación: Para enviar actualizaciones, notificaciones y otros mensajes relacionados con nuestros servicios.'},
  { id: '4', title: 'Soporte al Cliente: Para responder a consultas y brindar asistencia técnica.'},
  { id: '5', title: 'Seguridad: Para garantizar la seguridad y la integridad de nuestras plataformas.'},
];

const sharingInfo = [
    { id: '1', title: 'Proveedores de Servicios: Para colaborar con terceros que nos ayudan a ofrecer nuestros servicios.'},
    { id: '2', title: 'Por Requerimiento Legal: Cuando sea necesario para cumplir con obligaciones legales o para proteger nuestros derechos, propiedad o seguridad, o los de nuestros usuarios.'},
    { id: '3', title: 'Con Tu Consentimiento: Cuando hayas dado tu consentimiento para compartir tu información.'}
];

const userRights = [
    {id: '1', title: 'Acceder: Solicitar una copia de la información personal que tenemos sobre ti.'},
    {id: '2', title: 'Rectificar: Corregir o actualizar información personal inexacta.'},
    {id: '3', title: 'Eliminar: Solicitar la eliminación de tu información personal, sujeto a ciertas condiciones legales.'},
    {id: '4', title: 'Oponerte al Tratamiento: En algunos casos, puedes oponerte al tratamiento de tu información personal.'},
];

// Componentes
const SectionTitle = ({ children }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const Paragraph = ({ children }) => (
  <Text style={styles.paragraph}>{children}</Text>
);

const ItemList = ({ data }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text style={styles.paragraph}>• {item.title}</Text>
      </View>
    )}
    keyExtractor={item => item.id}
  />
);

// Componente Principal
const Privacy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidad</Text>
      
      <SectionTitle>Introducción</SectionTitle>
      <Paragraph>
        En Axis Development, nos comprometemos a proteger y respetar tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos la información personal que obtenemos a través de nuestros servicios de desarrollo de software y nuestras plataformas digitales.
      </Paragraph>
      
      <SectionTitle>Información Recopilada</SectionTitle>
      <Paragraph>Recopilamos y procesamos la siguiente información personal:</Paragraph>
      <ItemList data={data} />
      
      <SectionTitle>Uso de información</SectionTitle>
      <Paragraph>Utilizamos la información personal para los siguientes propósitos:</Paragraph>
      <ItemList data={usoDeInfo} />
      
      <SectionTitle>Compartir Información</SectionTitle>
      <Paragraph>No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:</Paragraph>
      <ItemList data={sharingInfo} />
      
      <SectionTitle>Seguridad de la información</SectionTitle>
      <Paragraph>
        Adoptamos medidas de seguridad adecuadas para proteger la información personal contra accesos no autorizados, alteraciones, divulgaciones o destrucción. Utilizamos tecnologías de encriptación y otras prácticas de seguridad para proteger tus datos.
      </Paragraph>
      
      <SectionTitle>Derechos de usuario</SectionTitle>
      <Paragraph>Tienes el derecho a:</Paragraph>
      <ItemList data={userRights} />
      <Paragraph>Para ejercer estos derechos, por favor, contacta con nuestro equipo de privacidad en [axisdev.tft@gmail.com].</Paragraph>
      
      <SectionTitle>Cambios en la Política de Privacidad</SectionTitle>
      <Paragraph>
        Podemos actualizar esta Política de Privacidad ocasionalmente para reflejar cambios en nuestras prácticas o en la legislación aplicable. Te notificaremos sobre cualquier cambio importante a través de nuestros canales de comunicación.
      </Paragraph>
      
      <SectionTitle>Contacto</SectionTitle>
      <Paragraph>
        Si tienes preguntas o inquietudes sobre nuestra Política de Privacidad o el manejo de tu información personal, por favor, contacta con nosotros en:
      </Paragraph>
      <SectionTitle>Axis Development</SectionTitle>
      <Paragraph>Direccion:</Paragraph>
      <Paragraph>Empire State Building</Paragraph>
      <Paragraph>Correo electrónico: axisdev.tft@gmail.com</Paragraph>
      <Paragraph>Teléfono: +52 (664) 756-9880</Paragraph>
      <Text style={styles.paragraph}>Última actualización: 10 de enero de 2024</Text>
      <Text style={styles.paragraph}></Text>
      <Text style={styles.paragraph}></Text>
    </ScrollView>
  );
};

export default Privacy;

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
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  item: {
    paddingVertical: 10,
  },
});