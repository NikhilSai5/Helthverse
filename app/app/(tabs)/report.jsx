import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Report = () => {
  const [useremail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([
    {
      id: "case65c_001",
      type: "Chest X-ray",
      category: "Diagnostic Imaging",
      date: "2022-06-05",
      day: "Sunday",
      size: "7 MB",
      filename: "case65c_001.dcm",
      tags: ["Heart disease"],
      iconName: "file-document-outline",
    },
    {
      id: "SARS-CoV-2",
      type: "Covid-19 PCR Test",
      category: "Laboratory results",
      date: "2022-05-18",
      day: "Wednesday",
      size: "40 KB",
      filename: "SARS-CoV-2-Result.jpg",
      tags: ["Flu"],
      status: "Negative",
      iconName: "flask-outline",
    },
    {
      id: "bloodwork_223",
      type: "Blood Test",
      category: "Laboratory results",
      date: "2022-04-10",
      day: "Sunday",
      size: "1.2 MB",
      filename: "bloodwork_223.pdf",
      tags: ["Routine checkup"],
      iconName: "water-outline",
    },
  ]);

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
  const [health, setHealth] = useState("Health Records");
  const [filterOpen, setFilterOpen] = useState(false);
  const [uploadingToBlockchain, setUploadingToBlockchain] = useState(false);

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      // Simulate blockchain upload
      setUploadingToBlockchain(true);

      setTimeout(() => {
        const file = result.assets[0];
        const now = new Date();
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const newReport = {
          id: `report_${Math.random().toString(36).substring(7)}`,
          type: file.name.includes(".pdf")
            ? "Medical Report"
            : "Diagnostic Scan",
          category: file.name.includes(".pdf")
            ? "Medical Record"
            : "Diagnostic Imaging",
          date: now.toISOString().split("T")[0],
          day: days[now.getDay()],
          size: `${(file.size / 1024).toFixed(1)} KB`,
          filename: file.name,
          tags: ["New upload"],
          iconName: file.name.includes(".pdf")
            ? "file-document-outline"
            : "image-outline",
        };

        setReports([newReport, ...reports]);
        setUploadingToBlockchain(false);
      }, 2000);
    } catch (error) {
      console.log("Error uploading file:", error);
      setUploadingToBlockchain(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F4FBFC" }}>
      <StatusBar backgroundColor="#537FE7" barStyle="light-content" />

      {/* Header */}
      <View
        style={{
          backgroundColor: "#537FE7",
          paddingTop: 40,
          paddingBottom: 20,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#F4FBFC",
                marginRight: 10,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: "https://placekitten.com/200/200" }}
                style={{ width: 40, height: 40 }}
                resizeMode="cover"
              />
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  {useremail}
                </Text>
                <Ionicons name="chevron-down" size={18} color="white" />
              </View>
              <Text style={{ fontSize: 14, color: "white", opacity: 0.9 }}>
                {health}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#F4FBFC",
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
            }}
            onPress={uploadFile}
          >
            <Ionicons name="add" size={24} color="#537FE7" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Section */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderRadius: 10,
            elevation: 1,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="filter" size={18} color="#537FE7" />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "500",
                color: "black",
              }}
            >
              Filter
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Reports List */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 80 }} // Add padding at bottom for the floating navbar
      >
        {uploadingToBlockchain && (
          <View
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              elevation: 2,
            }}
          >
            <ActivityIndicator size="small" color="#537FE7" />
            <Text style={{ marginLeft: 10, fontSize: 14, color: "black" }}>
              Uploading to blockchain...
            </Text>
          </View>
        )}

        {reports.map((report, index) => (
          <View
            key={report.id}
            style={{
              backgroundColor: "white",
              padding: 15,
              borderRadius: 10,
              marginBottom: 15,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 14, color: "gray", marginBottom: 10 }}>
              {report.date} {report.day}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: "#E6F2FF",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name={report.iconName}
                    size={24}
                    color="#537FE7"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                  >
                    {report.type}
                  </Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    {report.category}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Ionicons name="attach" size={14} color="gray" />
                    <Text
                      style={{ fontSize: 13, color: "gray", marginLeft: 3 }}
                    >
                      {report.filename}
                    </Text>
                  </View>

                  <Text style={{ fontSize: 13, color: "gray", marginTop: 2 }}>
                    Size: {report.size}
                  </Text>

                  {report.status && (
                    <Text
                      style={{
                        color: report.status === "Negative" ? "green" : "red",
                        fontSize: 14,
                        marginTop: 5,
                        fontWeight: "500",
                      }}
                    >
                      {report.status}
                    </Text>
                  )}
                </View>
              </View>

              <Ionicons name="ellipsis-vertical" size={18} color="gray" />
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {report.tags.map((tag, tagIndex) => (
                <View
                  key={tagIndex}
                  style={{
                    backgroundColor: "#FEE8E8",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#FF7979" }}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Report;
