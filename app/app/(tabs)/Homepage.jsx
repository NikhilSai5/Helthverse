import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Homepage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  // Fetch user email when component mounts
  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.error("Failed to get user email from storage:", error);
      }
    };

    getUserEmail();
  }, []);

  return (
    <>
      <View style={styles.homeHeader}>
        <ImageBackground
          source={require("../../assets/background circles.png")}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        ></ImageBackground>
        <View style={styles.headerTextContainer}>
          <Text style={{ fontSize: 18 }}>Hello, </Text>
          <Text style={{ fontSize: 23, fontWeight: "bold" }}>
            {userEmail || "User"}
          </Text>
        </View>

        <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
          <Text style={{ fontSize: 42, fontWeight: "semibold" }}>
            How are you
          </Text>
          <Text style={{ fontSize: 42, fontWeight: "semibold" }}>
            Feeling Today?
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => router.push("/report")}
        >
          <Text>Medical</Text>
          <Text style={styles.boxText}>Records</Text>
          <Image
            source={require("../../assets/top-right arrow.png")}
            style={styles.boxicon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => router.push("/Doctors")}
        >
          <Text>Talk to </Text>
          <Text style={styles.boxText}>Doctors</Text>
          <Image
            source={require("../../assets/top-right arrow.png")}
            style={styles.boxicon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => router.push("/Prescription")}
        >
          <Text>Scan Your</Text>
          <Text style={styles.boxText}>Prescription</Text>
          <Image
            source={require("../../assets/top-right arrow.png")}
            style={styles.boxicon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => router.push("/Chatbot")}
        >
          <Text>Talk to an</Text>
          <Text style={styles.boxText}>Assistant</Text>
          <Image
            source={require("../../assets/top-right arrow.png")}
            style={styles.boxicon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  homeHeader: {
    height: "40%",
    backgroundColor: "#E9F8F9",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  headerTextContainer: {
    padding: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  imageBackground: {
    width: 230,
    height: 230,
    right: 0,
    top: 0,
    position: "absolute",
    padding: 20,
  },
  imageStyle: {
    resizeMode: "cover",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  box: {
    width: "47%",
    height: "70%",
    backgroundColor: "#E9F8F9",
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    alignItems: "start",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  boxicon: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 20,
    bottom: 20,
    resizeMode: "contain",
  },
  boxText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Homepage;
