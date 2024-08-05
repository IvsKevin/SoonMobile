import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("../screens/Account")}
        >
          <Icon name="user" size={24} color="#4caf50" />
          <Text style={styles.optionText}>Account</Text>
          <Icon name="angle-right" size={24} color="#999" style={styles.optionIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("../screens/Notifications")}
        >
          <Icon name="bell" size={24} color="#ff9800" />
          <Text style={styles.optionText}>Notifications</Text>
          <Icon name="angle-right" size={24} color="#999" style={styles.optionIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("../screens/Privacy")}
        >
          <Icon name="lock" size={24} color="#f44336" />
          <Text style={styles.optionText}>Privacy</Text>
          <Icon name="angle-right" size={24} color="#999" style={styles.optionIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("../screens/About")}
        >
          <Icon name="info-circle" size={24} color="#3f51b5" />
          <Text style={styles.optionText}>About</Text>
          <Icon name="angle-right" size={24} color="#999" style={styles.optionIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push("../screens/logout")}
        >
          <Icon name="sign-out" size={24} color="#e91e63" />
          <Text style={styles.optionText}>Logout</Text>
          <Icon name="angle-right" size={24} color="#999" style={styles.optionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
  },
  optionIcon: {
    marginLeft: "auto",
  },
});

export default Settings;
