// import { View, Text } from "react-native";
// import React from "react";

// const Prescription = () => {
//   return (
//     <View>
//       <Text>Prescription</Text>
//     </View>
//   );
// };

// export default Prescription;
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";

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

  // This function would be called when a picture is taken
  const handleCapture = () => {
    setShowCamera(false);

    const newPrescription = {
      id: String(Date.now()),
      image: "https://placeholder.com/new-prescription",
      date: new Date().toISOString().split("T")[0],
      medicines: [
        { name: "New Medicine", dosage: "TBD", schedule: "TBD", remaining: 0 },
      ],
    };

    setPrescriptions([newPrescription, ...prescriptions]);
  };

  // Camera view component
  const CameraView = () => (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraPreview}>
        <Text style={styles.cameraText}>Camera Preview</Text>
        {/* This would be replaced with actual camera component */}
      </View>
      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.captureButtonText}>Capture Prescription</Text>
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
      </View>
      <View style={styles.remainingContainer}>
        <Text style={styles.remainingCount}>{medicine.remaining}</Text>
        <Text style={styles.remainingLabel}>remaining</Text>
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
            >
              <Text style={styles.floatingButtonText}>
                📷 Scan Prescription
              </Text>
            </TouchableOpacity>
          </>
        )}

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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
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
    fontSize: 22,
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
    backgroundColor: "#000",
  },
  cameraPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  cameraText: {
    color: "white",
    fontSize: 18,
  },
  cameraControls: {
    padding: 20,
    backgroundColor: "#111",
    alignItems: "center",
    paddingBottom: 140, // Extra space for navbar
  },
  captureButton: {
    backgroundColor: "#537FE7", // dark theme color
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginBottom: 12,
  },
  captureButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: "60%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
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
});

export default Prescription;
