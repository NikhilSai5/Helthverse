import {
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
const Doctors = () => {
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
            Nikhil Sai Manam
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.Doctorinput} placeholder="Ask Anything" />
          <TouchableOpacity>
            <AntDesign name="search1" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Fever</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Infection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cold</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Top Doctors</Text>
      <View style={styles.doctorCardsContainer}>
        <TouchableOpacity style={styles.doctorCard}>
          <View style={styles.doctorCardImg}>
            <AntDesign name="user" size={30} color="white" />
          </View>
          <View style={styles.doctorCardText}>
            <Text style={styles.doctorName}>Dr. Sriram Naveen</Text>
            <Text style={styles.doctorSpecialty}>
              Specialized in Heart Surgery
            </Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>call</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.doctorCard}>
          <View style={styles.doctorCardImg}>
            <AntDesign name="user" size={30} color="white" />
          </View>
          <View style={styles.doctorCardText}>
            <Text style={styles.doctorName}>Dr. Priya Sharma</Text>
            <Text style={styles.doctorSpecialty}>Pediatrician</Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>call</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
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
  inputContainer: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    marginHorizontal: 30,
    height: 50,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Doctorinput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 30,
  },
  button: {
    backgroundColor: "#537FE7",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  doctorCardsContainer: {
    paddingHorizontal: 20,
  },
  doctorCardImg: {
    width: 60,
    height: 60,
    backgroundColor: "#537FE7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    alignItems: "center",
    elevation: 3,
  },
  doctorCardText: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  bookButton: {
    backgroundColor: "#1AACAC",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default Doctors;
