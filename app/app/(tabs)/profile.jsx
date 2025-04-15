import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { BarChart, LineChart } from "react-native-chart-kit";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const screenWidth = Dimensions.get("window").width;

const Profile = () => {
  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [60, 45, 80, 70, 55],
      },
    ],
  };

  const heartRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [78, 82, 75, 80, 74, 76],
        color: (opacity = 1) => `rgba(255, 51, 51, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartWidth = screenWidth - 60;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/background circles profile.png")}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.editButton}>
            <AntDesign name="edit" size={20} color="#537FE7" />
          </TouchableOpacity>

          <View style={styles.userprofilesContainer}>
            <Image
              source={require("../../assets/Defult Profile.png")}
              style={styles.profileImg}
            />
            <Text style={styles.userName}>Nikhil Sai Manam</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Excellent Health</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>19</Text>
              <Text style={styles.statLabel}>Age</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>81 kg</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>190 cm</Text>
              <Text style={styles.statLabel}>Height</Text>
            </View>
          </View>

          <View style={styles.subHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="call-outline" size={18} color="#537FE7" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>2837462749</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <Ionicons name="mail-outline" size={18} color="#537FE7" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>Nikhilsaimanam@gmail.com</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="heartbeat" size={18} color="#537FE7" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Blood Type</Text>
                <Text style={styles.infoValue}>O+</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.chartsContainer}>
          <View style={styles.graphSection}>
            <View style={styles.graphHeader}>
              <Text style={styles.graphTitle}>Weekly Activity</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <BarChart
              data={activityData}
              width={chartWidth}
              height={180}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: "#FFFFFF",
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(83, 127, 231, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 20,
                },
                barPercentage: 0.6,
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              style={{
                borderRadius: 20,
                paddingRight: 0,
                marginVertical: 8,
              }}
              fromZero={true}
              showValuesOnTopOfBars={true}
              withInnerLines={false}
            />
          </View>

          <View style={styles.graphSection}>
            <View style={styles.graphHeader}>
              <Text style={styles.graphTitle}>Heart Rate</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <LineChart
              data={heartRateData}
              width={chartWidth}
              height={180}
              yAxisLabel=""
              yAxisSuffix=" bpm"
              chartConfig={{
                backgroundColor: "#FFFFFF",
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(83, 127, 231, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 20,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#537FE7",
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              style={{
                borderRadius: 20,
                paddingRight: 0,
                marginVertical: 8,
              }}
              bezier
            />
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
  imageBackground: {
    width: "100%",
    height: 300,
    bottom: -80,
    position: "absolute",
    padding: 0,
  },
  imageStyle: {
    resizeMode: "cover",
  },
  profileHeader: {
    backgroundColor: "#E9F8F9",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    padding: 20,
    paddingBottom: 30,
  },
  editButton: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    zIndex: 1,
  },
  userprofilesContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 25,
  },
  profileImg: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "white",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    backgroundColor: "#537FE7",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 5,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  subHeader: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    marginHorizontal: 5,
    padding: 15,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F4FBFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  chartsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  graphSection: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    backgroundColor: "white",
    marginVertical: 15,
    borderRadius: 20,
    padding: 15,
  },
  graphHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  graphTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  viewAll: {
    color: "#537FE7",
    fontSize: 14,
    fontWeight: "500",
  },
  upcomingSection: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginVertical: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  appointmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  appointmentLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateBox: {
    backgroundColor: "#F4FBFC",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    width: 50,
    height: 60,
    justifyContent: "center",
    marginRight: 15,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#537FE7",
  },
  dateMonth: {
    fontSize: 14,
    color: "#666",
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  appointmentSpecialty: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  appointmentTime: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  timeText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
  },
  rescheduleButton: {
    backgroundColor: "#537FE7",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  rescheduleText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
});

export default Profile;
