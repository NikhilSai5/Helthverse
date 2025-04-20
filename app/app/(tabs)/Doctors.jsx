import {
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

const Doctors = () => {
  const [activeCondition, setActiveCondition] = useState("Fever");
  const [useremail, setUserEmail] = useState("");

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.error("Failed to get user email from storage:", error);
        setLoading(false);
      }
    };

    getUserEmail();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4FBFC" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.homeHeader}>
          <ImageBackground
            source={require("../../assets/background circles.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          />

          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.username}>{useremail}</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.inputContainer}>
            <AntDesign
              name="search1"
              size={18}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.doctorInput}
              placeholder="Search for doctors, symptoms..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="#537FE7" />
            </TouchableOpacity>
          </View>

          {/* Condition Buttons */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.buttonScrollContainer}
          >
            {[
              { name: "Fever", icon: "thermometer" },
              { name: "Infection", icon: "virus" },
              { name: "Cold", icon: "snowflake" },
              { name: "Dental", icon: "tooth" },
              { name: "Heart", icon: "heart" },
            ].map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.button,
                  activeCondition === item.name && styles.activeButton,
                ]}
                onPress={() => setActiveCondition(item.name)}
              >
                <FontAwesome5
                  name={item.icon}
                  size={14}
                  color={activeCondition === item.name ? "white" : "#537FE7"}
                  style={styles.buttonIcon}
                />
                <Text
                  style={[
                    styles.buttonText,
                    activeCondition === item.name && styles.activeButtonText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Doctor Cards */}
          <View style={styles.doctorCardsContainer}>
            {/* Doctor Card 1 */}
            <TouchableOpacity style={styles.doctorCard}>
              <View style={styles.doctorCardImg}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/76.jpg",
                  }}
                  style={styles.doctorImage}
                />
                <View style={styles.onlineIndicator} />
              </View>

              <View style={styles.doctorCardText}>
                <View style={styles.doctorNameRow}>
                  <Text style={styles.doctorName}>Dr. Sriram Naveen</Text>
                  <View style={styles.verifiedBadge}>
                    <MaterialIcons name="verified" size={14} color="#537FE7" />
                  </View>
                </View>

                <Text style={styles.doctorSpecialty}>
                  Cardiologist • Heart Surgery
                </Text>

                <View style={styles.doctorStatsRow}>
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>4.9</Text>
                  </View>

                  <View style={styles.experienceContainer}>
                    <MaterialIcons name="work" size={14} color="#537FE7" />
                    <Text style={styles.experienceText}>8+ years</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.callButton}>
                <Feather name="phone" size={16} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Doctor Card 2 */}
            <TouchableOpacity style={styles.doctorCard}>
              <View style={styles.doctorCardImg}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/women/44.jpg",
                  }}
                  style={styles.doctorImage}
                />
                <View
                  style={[styles.onlineIndicator, styles.offlineIndicator]}
                />
              </View>

              <View style={styles.doctorCardText}>
                <View style={styles.doctorNameRow}>
                  <Text style={styles.doctorName}>Dr. Priya Sharma</Text>
                  <View style={styles.verifiedBadge}>
                    <MaterialIcons name="verified" size={14} color="#537FE7" />
                  </View>
                </View>

                <Text style={styles.doctorSpecialty}>
                  Pediatrician • Child Specialist
                </Text>

                <View style={styles.doctorStatsRow}>
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>

                  <View style={styles.experienceContainer}>
                    <MaterialIcons name="work" size={14} color="#537FE7" />
                    <Text style={styles.experienceText}>5+ years</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.callButton}>
                <Feather name="phone" size={16} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Doctor Card 3 */}
            <TouchableOpacity style={styles.doctorCard}>
              <View style={styles.doctorCardImg}>
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/36.jpg",
                  }}
                  style={styles.doctorImage}
                />
                <View style={styles.onlineIndicator} />
              </View>

              <View style={styles.doctorCardText}>
                <View style={styles.doctorNameRow}>
                  <Text style={styles.doctorName}>Dr. Rajesh Kumar</Text>
                  <View style={styles.verifiedBadge}>
                    <MaterialIcons name="verified" size={14} color="#537FE7" />
                  </View>
                </View>

                <Text style={styles.doctorSpecialty}>
                  Neurologist • Brain Specialist
                </Text>

                <View style={styles.doctorStatsRow}>
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>4.7</Text>
                  </View>

                  <View style={styles.experienceContainer}>
                    <MaterialIcons name="work" size={14} color="#537FE7" />
                    <Text style={styles.experienceText}>12+ years</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.callButton}>
                <Feather name="phone" size={16} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Upcoming Appointments Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentDateContainer}>
                <Text style={styles.appointmentDay}>MON</Text>
                <Text style={styles.appointmentDate}>24</Text>
              </View>

              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentTime}>09:30 AM - 10:00 AM</Text>
                <Text style={styles.appointmentType}>Video Consultation</Text>
              </View>

              <View style={styles.appointmentStatus}>
                <Text style={styles.statusText}>Confirmed</Text>
              </View>
            </View>

            <View style={styles.appointmentDivider} />

            <View style={styles.appointmentDoctor}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/76.jpg",
                }}
                style={styles.appointmentDoctorImage}
              />
              <View>
                <Text style={styles.appointmentDoctorName}>
                  Dr. Sriram Naveen
                </Text>
                <Text style={styles.appointmentDoctorSpecialty}>
                  Cardiologist
                </Text>
              </View>
              <TouchableOpacity style={styles.appointmentButton}>
                <Text style={styles.appointmentButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBFC",
  },
  homeHeader: {
    backgroundColor: "#F4FBFC",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 15,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  headerTextContainer: {
    marginTop: 0,
  },
  greeting: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",

    marginBottom: 20,
  },
  profileImageContainer: {
    marginTop: 10,
  },
  profileButton: {
    position: "relative",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: "#537FE7",
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#F4FBFC",
  },
  imageBackground: {
    width: 230,
    height: 230,
    right: -20,
    top: -20,
    position: "absolute",
    opacity: 0.6,
  },
  imageStyle: {
    resizeMode: "cover",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    height: 50,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    marginTop: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  searchIcon: {
    marginRight: 10,
  },
  doctorInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: "#333",
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonScrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activeButton: {
    backgroundColor: "#537FE7",
    borderColor: "#537FE7",
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    color: "#537FE7",
    fontWeight: "600",
    fontSize: 13,
  },
  activeButtonText: {
    color: "white",
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  seeAllText: {
    color: "#537FE7",
    fontWeight: "600",
    fontSize: 14,
  },
  doctorCardsContainer: {
    marginBottom: 25,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.08,
    elevation: 2,
    alignItems: "center",
  },
  doctorCardImg: {
    position: "relative",
    marginRight: 15,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#F0F0F0",
  },
  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  offlineIndicator: {
    backgroundColor: "#9E9E9E",
  },
  doctorCardText: {
    flex: 1,
  },
  doctorNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  doctorName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },
  verifiedBadge: {
    marginLeft: 5,
  },
  doctorSpecialty: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },
  doctorStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#FFFBEA",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#222",
    fontWeight: "500",
  },
  experienceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  experienceText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#222",
    fontWeight: "500",
  },
  callButton: {
    backgroundColor: "#537FE7",
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  appointmentCard: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.08,
    elevation: 2,
  },
  appointmentHeader: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  appointmentDateContainer: {
    backgroundColor: "#F0F8FF",
    width: 50,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  appointmentDay: {
    fontSize: 12,
    fontWeight: "500",
    color: "#537FE7",
  },
  appointmentDate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#537FE7",
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  appointmentType: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  appointmentStatus: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
  },
  appointmentDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 15,
  },
  appointmentDoctor: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  appointmentDoctorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  appointmentDoctorName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  appointmentDoctorSpecialty: {
    fontSize: 13,
    color: "#666",
  },
  appointmentButton: {
    backgroundColor: "#537FE7",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft: "auto",
  },
  appointmentButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
});

export default Doctors;
