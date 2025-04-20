import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker"; // Added ImagePicker import

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "1",
      image: "https://placeholder.com/prescription1",
      date: "2025-04-10",
      medicines: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          schedule: "Three times daily",
          remaining: 15,
        },
        {
          name: "Ibuprofen",
          dosage: "400mg",
          schedule: "As needed",
          remaining: 20,
        },
      ],
    },
    {
      id: "2",
      image: "https://placeholder.com/prescription2",
      date: "2025-04-15",
      medicines: [
        {
          name: "Loratadine",
          dosage: "10mg",
          schedule: "Once daily",
          remaining: 25,
        },
      ],
    },
    {
      id: "3",
      image: "https://placeholder.com/prescription3",
      date: "2025-04-02",
      medicines: [
        {
          name: "Atorvastatin",
          dosage: "20mg",
          schedule: "Before bed",
          remaining: 28,
        },
        {
          name: "Metformin",
          dosage: "500mg",
          schedule: "With meals",
          remaining: 45,
        },
      ],
    },
  ]);

  const [showCamera, setShowCamera] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const GEMINI_API_KEY = "AIzaSyChLYW845Nu3kTrgizXvztf1Uxr12S32HE";
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const convertToBase64 = async (uri) => {
    try {
      console.log("Converting image to base64...");
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Conversion successful!");
      return base64;
    } catch (error) {
      console.error("Error converting image:", error);
      return null;
    }
  };

  //   const processPrescriptionImage = async (imageUri) => {
  //     try {
  //       setProcessing(true);
  //       console.log("Processing prescription image...");

  //       // Convert image to base64
  //       const base64Image = await convertToBase64(imageUri);
  //       if (!base64Image) {
  //         throw new Error("Failed to convert image to base64");
  //       }

  //       // Send to Gemini API
  //       const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  //       const imagePart = {
  //         inlineData: {
  //           data: base64Image,
  //           mimeType: "image/jpeg",
  //         },
  //       };

  //       const prompt = `
  // Analyze this prescription image and extract all information in a structured JSON format.

  // Please return ONLY a valid JSON object with the following structure:
  // {
  //   "medicines": [
  //     {
  //       "name": "Medicine name",
  //       "dosage": "Dosage amount",
  //       "schedule": "When to take it",
  //       "instructions": "Additional instructions",
  //       "duration": "How long to take it",
  //       "remaining": 30 (default to 30 if not specified)
  //     }
  //   ],
  //   "doctor": "Doctor's name if visible",
  //   "hospital": "Hospital/clinic name if visible",
  //   "date": "Prescription date if visible (YYYY-MM-DD format)"
  // }

  // Do not include any explanation, notes, or additional text outside the JSON object. The JSON must be valid and properly formatted.

  // `;
  //       console.log("Making Gemini API request...");
  //       const response = await model.generateContent([prompt, imagePart]);
  //       const result = response.response.text();

  //       try {
  //         // Parse the JSON response
  //         const prescriptionData = JSON.parse(result);
  //         console.log("Successfully parsed prescription data:", prescriptionData);

  //         // Create new prescription entry
  //         const newPrescription = {
  //           id: String(Date.now()),
  //           image: imageUri,
  //           date: prescriptionData.date || new Date().toISOString().split("T")[0],
  //           medicines: prescriptionData.medicines || [],
  //           doctor: prescriptionData.doctor || "",
  //           hospital: prescriptionData.hospital || "",
  //         };

  //         // Add to prescriptions list
  //         setPrescriptions([newPrescription, ...prescriptions]);
  //       } catch (jsonError) {
  //         console.error("Error parsing JSON from API response:", jsonError);
  //         console.log("Raw response:", result);

  //         // Handle invalid JSON by creating a basic prescription
  //         const newPrescription = {
  //           id: String(Date.now()),
  //           image: imageUri,
  //           date: new Date().toISOString().split("T")[0],
  //           medicines: [
  //             {
  //               name: "Unknown Medicine",
  //               dosage: "See prescription",
  //               schedule: "As directed",
  //               remaining: 30,
  //             },
  //           ],
  //         };

  //         setPrescriptions([newPrescription, ...prescriptions]);
  //       }
  //     } catch (error) {
  //       console.error("Error processing prescription:", error);

  //       // Create a fallback prescription
  //       const newPrescription = {
  //         id: String(Date.now()),
  //         image: imageUri,
  //         date: new Date().toISOString().split("T")[0],
  //         medicines: [
  //           {
  //             name: "Unknown Medicine",
  //             dosage: "See prescription",
  //             schedule: "As directed",
  //             remaining: 30,
  //           },
  //         ],
  //       };

  //       setPrescriptions([newPrescription, ...prescriptions]);
  //     } finally {
  //       setProcessing(false);
  //       setCapturedImage(null);
  //       setShowCamera(false);
  //     }
  //   };

  // Function to save the image locally

  const processPrescriptionImage = async (imageUri) => {
    try {
      setProcessing(true);
      console.log("Processing prescription image...");

      // Convert image to base64
      const base64Image = await convertToBase64(imageUri);
      if (!base64Image) {
        throw new Error("Failed to convert image to base64");
      }

      // Send to Gemini API
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      };

      const prompt = `
  Analyze this prescription image and extract all information in a structured JSON format.
  
  Please return ONLY a valid JSON object with the following structure:
  {
    "medicines": [
      {
        "name": "Medicine name",
        "dosage": "Dosage amount",
        "schedule": "When to take it",
        "instructions": "Additional instructions",
        "duration": "How long to take it",
        
      }
    ],
    "doctor": "Doctor's name if visible",
    "hospital": "Hospital/clinic name if visible",
    "date": "Prescription date if visible (YYYY-MM-DD format)"
  }
  
  Do not include any explanation, notes, or additional text outside the JSON object. The JSON must be valid and properly formatted. Do not wrap the JSON in markdown code blocks.
  `;
      console.log("Making Gemini API request...");
      const response = await model.generateContent([prompt, imagePart]);
      let result = response.response.text();

      try {
        // Clean up the response if it contains markdown code blocks
        if (result.includes("```")) {
          // Extract the JSON from between code blocks
          const jsonRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
          const match = result.match(jsonRegex);
          if (match && match[1]) {
            result = match[1];
          } else {
            // Try to remove just the backticks
            result = result.replace(/```json|```/g, "").trim();
          }
        }

        // Parse the JSON response
        const prescriptionData = JSON.parse(result);
        console.log("Successfully parsed prescription data:", prescriptionData);

        // Create new prescription entry
        const newPrescription = {
          id: String(Date.now()),
          image: imageUri,
          date: prescriptionData.date || new Date().toISOString().split("T")[0],
          medicines: prescriptionData.medicines || [],
          doctor: prescriptionData.doctor || "",
          hospital: prescriptionData.hospital || "",
          duration: prescriptionData.duration || "",
        };

        // Add to prescriptions list
        setPrescriptions([newPrescription, ...prescriptions]);
      } catch (jsonError) {
        console.error("Error parsing JSON from API response:", jsonError);
        console.log("Raw response:", result);

        // Handle invalid JSON by creating a basic prescription
        const newPrescription = {
          id: String(Date.now()),
          image: imageUri,
          date: new Date().toISOString().split("T")[0],
          medicines: [
            {
              name: "Unknown Medicine",
              dosage: "See prescription",
              schedule: "As directed",
              duration: "Unknown",
            },
          ],
        };

        setPrescriptions([newPrescription, ...prescriptions]);
      }
    } catch (error) {
      console.error("Error processing prescription:", error);

      // Create a fallback prescription
      const newPrescription = {
        id: String(Date.now()),
        image: imageUri,
        date: new Date().toISOString().split("T")[0],
        medicines: [
          {
            name: "Unknown Medicine",
            dosage: "See prescription",
            schedule: "As directed",
            duration: "Unknown",
          },
        ],
      };

      setPrescriptions([newPrescription, ...prescriptions]);
    } finally {
      setProcessing(false);
      setCapturedImage(null);
      setShowCamera(false);
    }
  };
  const saveImage = async (imageUri) => {
    try {
      const filename = imageUri.split("/").pop(); // Extract file name
      const newPath = `${FileSystem.documentDirectory}${filename}`; // New file path
      await FileSystem.copyAsync({ from: imageUri, to: newPath });
      return newPath; // Return saved file path
    } catch (error) {
      console.error("Error saving image:", error);
      return null;
    }
  };

  // Open camera function using ImagePicker
  const openCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access the camera is required!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 1,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const savedUri = await saveImage(result.assets[0].uri);
        if (savedUri) {
          setCapturedImage(savedUri);
          await processPrescriptionImage(savedUri);
        }
      }
    } catch (error) {
      console.error("Error opening camera:", error);
      setShowCamera(false);
    }
  };

  // Open gallery function
  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const savedUri = await saveImage(result.assets[0].uri);
        if (savedUri) {
          setCapturedImage(savedUri);
          await processPrescriptionImage(savedUri);
        }
      }
    } catch (error) {
      console.error("Error opening gallery:", error);
    } finally {
      setShowCamera(false);
    }
  };

  // Modified CameraView component to show options for camera and gallery
  const CameraView = () => (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraOptions}>
        <Text style={styles.cameraOptionsTitle}>Capture Prescription</Text>
        <Text style={styles.cameraOptionsSubtitle}>
          Choose how you want to add your prescription
        </Text>

        <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
          <Text style={styles.optionButtonText}>📷 Take a Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
          <Text style={styles.optionButtonText}>🖼️ Choose from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setShowCamera(false)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Single medicine item component
  const MedicineItem = ({ medicine }) => (
    <View style={styles.medicineItem}>
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{medicine.name}</Text>
        <Text style={styles.medicineDetails}>
          {medicine.dosage} • {medicine.schedule}
        </Text>
        {medicine.instructions && (
          <Text style={styles.medicineInstructions}>
            {medicine.instructions}
          </Text>
        )}
      </View>
      <View style={styles.remainingContainer}>
        <Text style={styles.remainingCount}>{medicine.duration}</Text>
        <Text style={styles.remainingLabel}>Duration</Text>
      </View>
    </View>
  );

  // Prescription card component
  const PrescriptionCard = ({ prescription }) => (
    <View style={styles.prescriptionCard}>
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: prescription.image }}
          style={styles.prescriptionImage}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.dateText}>Prescribed on</Text>
          <Text style={styles.dateValue}>{prescription.date}</Text>
          {prescription.doctor && (
            <Text style={styles.doctorText}>Dr. {prescription.doctor}</Text>
          )}
          <View style={styles.pillCountBadge}>
            <Text style={styles.pillCountText}>
              {prescription.medicines.length} medication
              {prescription.medicines.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.medicineList}>
        {prescription.medicines.map((medicine, index) => (
          <MedicineItem key={index} medicine={medicine} />
        ))}
      </View>
    </View>
  );

  // Empty state component
  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📋</Text>
      <Text style={styles.emptyStateTitle}>No Prescriptions Yet</Text>
      <Text style={styles.emptyStateText}>
        Tap the button below to add your first prescription
      </Text>
    </View>
  );

  // Processing overlay
  const ProcessingOverlay = () => (
    <View style={styles.processingOverlay}>
      <View style={styles.processingContent}>
        <ActivityIndicator size="large" color="#537FE7" />
        <Text style={styles.processingText}>Processing prescription...</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4FBFC" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Prescriptions</Text>
        </View>

        {showCamera ? (
          <CameraView />
        ) : (
          <>
            <FlatList
              data={prescriptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PrescriptionCard prescription={item} />
              )}
              contentContainerStyle={[
                styles.prescriptionsList,
                prescriptions.length === 0 && styles.emptyList,
              ]}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyState />}
            />

            <TouchableOpacity
              style={styles.floatingButton}
              onPress={() => setShowCamera(true)}
              disabled={processing}
            >
              <Text style={styles.floatingButtonText}>
                📷 Scan Prescription
              </Text>
            </TouchableOpacity>
          </>
        )}

        {processing && <ProcessingOverlay />}

        {/* Space for floating navbar */}
        <View style={styles.navbarSpace} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4FBFC", // light theme color
  },
  container: {
    flex: 1,
    backgroundColor: "#F4FBFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F4FBFC",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(83, 127, 231, 0.1)", // subtle dark theme color
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  prescriptionsList: {
    padding: 16,
    paddingBottom: 150, // Extra padding for floating button and navbar
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
  },
  prescriptionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  prescriptionImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "rgba(83, 127, 231, 0.1)", // subtle dark theme color
  },
  headerInfo: {
    marginLeft: 16,
    justifyContent: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  doctorText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  pillCountBadge: {
    backgroundColor: "rgba(83, 127, 231, 0.15)", // translucent dark theme color
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  pillCountText: {
    color: "#537FE7", // dark theme color
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginBottom: 16,
  },
  medicineList: {},
  medicineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  medicineDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  medicineInstructions: {
    fontSize: 13,
    color: "#888",
    fontStyle: "italic",
  },
  remainingContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(83, 127, 231, 0.1)",
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  remainingCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#537FE7", // dark theme color
  },
  remainingLabel: {
    fontSize: 10,
    textTransform: "uppercase",
    color: "#537FE7", // dark theme color
    opacity: 0.8,
  },
  floatingButton: {
    position: "absolute",
    bottom: 130, // Above navbar space
    alignSelf: "center",
    backgroundColor: "#537FE7", // dark theme color
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  navbarSpace: {
    height: 120, // Space for floating navbar
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraOptions: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  cameraOptionsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cameraOptionsSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#537FE7", // dark theme color
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  optionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    marginTop: 8,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyStateIcon: {
    fontSize: 50,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  processingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  processingContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "80%",
  },
  processingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 16,
  },
});

export default Prescription;
