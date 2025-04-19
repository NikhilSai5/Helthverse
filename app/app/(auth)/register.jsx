// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar,
//   ScrollView,
//   Alert,
//   Modal,
// } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";
// import { Picker } from "@react-native-picker/picker";

// const register = () => {
//   const router = useRouter();
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [bloodType, setBloodType] = useState("");
//   const [age, setAge] = useState("");
//   const [weight, setWeight] = useState("");
//   const [height, setHeight] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPicker, setShowPicker] = useState(false);

//   const API_URL =
//     Platform.OS === "android"
//       ? "http://10.12.48.52:5000/api/auth/signup"
//       : "http://10.12.48.52:5000/api/auth/signup";

//   const validateInputs = () => {
//     if (
//       !fullName ||
//       !email ||
//       !password ||
//       !confirmPassword ||
//       !phone ||
//       !bloodType ||
//       !age ||
//       !weight ||
//       !height
//     ) {
//       Alert.alert("Error", "Please fill in all fields");
//       return false;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return false;
//     }

//     if (password.length < 6) {
//       Alert.alert("Error", "Password must be at least 6 characters");
//       return false;
//     }

//     // Basic phone validation
//     const phoneRegex = /^\d{10,15}$/;
//     if (!phoneRegex.test(phone)) {
//       Alert.alert("Error", "Please enter a valid phone number (10-15 digits)");
//       return false;
//     }

//     return true;
//   };

//   const handleRegister = async () => {
//     if (!validateInputs()) return;

//     setIsLoading(true);
//     console.log("Starting registration process...");

//     try {
//       const userData = {
//         name: fullName,
//         email: email,
//         password: password,
//         phone: phone,
//         bloodType: bloodType,
//         age: parseInt(age),
//         weight: parseFloat(weight),
//         height: parseFloat(height),
//       };

//       console.log("Sending request to:", API_URL);
//       console.log("With data:", JSON.stringify(userData));

//       // Add timeout to prevent infinite waiting
//       const fetchPromise = fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       // Create a timeout promise
//       const timeoutPromise = new Promise((_, reject) => {
//         setTimeout(() => reject(new Error("Request timed out")), 10000); // 10 second timeout
//       });

//       // Race the fetch against the timeout
//       const response = await Promise.race([fetchPromise, timeoutPromise]);

//       console.log("Response received:", response.status);
//       const data = await response.json();
//       console.log("Response data:", data);

//       if (!response.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       Alert.alert("Success", "Account created successfully!", [
//         { text: "OK", onPress: () => router.push("/login") },
//       ]);
//     } catch (error) {
//       console.error("Registration error:", error);

//       // Handle specific network errors
//       if (error.message === "Network request failed") {
//         Alert.alert(
//           "Connection Error",
//           "Could not connect to the server. Please check your network connection and ensure the server is running.",
//           [{ text: "OK" }]
//         );
//       } else if (error.message === "Request timed out") {
//         Alert.alert(
//           "Timeout Error",
//           "The request took too long to complete. Please try again later.",
//           [{ text: "OK" }]
//         );
//       } else {
//         Alert.alert("Error", error.message || "Something went wrong");
//       }
//     } finally {
//       setIsLoading(false);
//       console.log("Registration process completed");
//     }
//   };

//   const bloodTypeOptions = [
//     { label: "Select Blood Type", value: "" },
//     { label: "A+", value: "A+" },
//     { label: "A-", value: "A-" },
//     { label: "B+", value: "B+" },
//     { label: "B-", value: "B-" },
//     { label: "AB+", value: "AB+" },
//     { label: "AB-", value: "AB-" },
//     { label: "O+", value: "O+" },
//     { label: "O-", value: "O-" },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#F4FBFC" barStyle="dark-content" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <View style={styles.contentContainer}>
//             <View style={styles.headerContainer}>
//               <Text style={styles.headerText}>Create Account</Text>
//               <Text style={styles.subHeaderText}>Sign up to get started</Text>
//             </View>

//             <View style={styles.formContainer}>
//               <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Full Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="John Doe"
//                   placeholderTextColor="#A0A0A0"
//                   autoCapitalize="words"
//                   value={fullName}
//                   onChangeText={setFullName}
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Email</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="your@email.com"
//                   placeholderTextColor="#A0A0A0"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   value={email}
//                   onChangeText={setEmail}
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Phone Number</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="1234567890"
//                   placeholderTextColor="#A0A0A0"
//                   keyboardType="phone-pad"
//                   value={phone}
//                   onChangeText={setPhone}
//                   maxLength={15}
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Blood Type</Text>
//                 <TouchableOpacity
//                   style={styles.pickerButton}
//                   onPress={() => setShowPicker(true)}
//                 >
//                   <Text
//                     style={
//                       bloodType
//                         ? styles.pickerSelectedText
//                         : styles.pickerPlaceholderText
//                     }
//                   >
//                     {bloodType || "Select Blood Type"}
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="••••••••"
//                   placeholderTextColor="#A0A0A0"
//                   secureTextEntry
//                   value={password}
//                   onChangeText={setPassword}
//                 />
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Confirm Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="••••••••"
//                   placeholderTextColor="#A0A0A0"
//                   secureTextEntry
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                 />
//               </View>

//               <View style={styles.rowContainer}>
//                 <View style={[styles.inputContainer, styles.halfWidth]}>
//                   <Text style={styles.inputLabel}>Age (years)</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="25"
//                     placeholderTextColor="#A0A0A0"
//                     keyboardType="numeric"
//                     value={age}
//                     onChangeText={setAge}
//                     maxLength={3}
//                   />
//                 </View>

//                 <View style={[styles.inputContainer, styles.halfWidth]}>
//                   <Text style={styles.inputLabel}>Weight (kg)</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="70"
//                     placeholderTextColor="#A0A0A0"
//                     keyboardType="numeric"
//                     value={weight}
//                     onChangeText={setWeight}
//                   />
//                 </View>
//               </View>

//               <View style={styles.inputContainer}>
//                 <Text style={styles.inputLabel}>Height (cm)</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="175"
//                   placeholderTextColor="#A0A0A0"
//                   keyboardType="numeric"
//                   value={height}
//                   onChangeText={setHeight}
//                   maxLength={3}
//                 />
//               </View>

//               <View style={styles.termsContainer}>
//                 <Text style={styles.termsText}>
//                   By registering, you agree to our{" "}
//                   <Text style={styles.linkText}>Terms of Service</Text> and{" "}
//                   <Text style={styles.linkText}>Privacy Policy</Text>
//                 </Text>
//               </View>

//               <TouchableOpacity
//                 style={[
//                   styles.registerButton,
//                   isLoading && styles.disabledButton,
//                 ]}
//                 onPress={handleRegister}
//                 disabled={isLoading}
//               >
//                 <Text style={styles.registerButtonText}>
//                   {isLoading ? "Creating Account..." : "Create Account"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.footerContainer}>
//               <Text style={styles.footerText}>Already have an account? </Text>
//               <TouchableOpacity onPress={() => router.push("/login")}>
//                 <Text style={styles.signinText}>Sign In</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.navbarSpacing} />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>

//       {/* Modal for Blood Type Picker */}
//       <Modal
//         visible={showPicker}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowPicker(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalHeaderText}>Select Blood Type</Text>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setShowPicker(false)}
//               >
//                 <Text style={styles.closeButtonText}>Done</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={bloodType}
//                 onValueChange={(itemValue) => {
//                   setBloodType(itemValue);
//                 }}
//                 style={styles.modalPicker}
//               >
//                 {bloodTypeOptions.map((option) => (
//                   <Picker.Item
//                     key={option.value}
//                     label={option.label}
//                     value={option.value}
//                   />
//                 ))}
//               </Picker>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4FBFC",
//   },
//   keyboardAvoid: {
//     flex: 1,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   headerContainer: {
//     marginBottom: 30,
//     marginTop: 20,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#000",
//     marginBottom: 8,
//   },
//   subHeaderText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   formContainer: {
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   rowContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   halfWidth: {
//     width: "48%",
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#000",
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: "#FFF",
//     height: 50,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//   },
//   pickerButton: {
//     backgroundColor: "#FFF",
//     height: 50,
//     borderRadius: 8,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     justifyContent: "center",
//   },
//   pickerSelectedText: {
//     fontSize: 16,
//     color: "black",
//   },
//   pickerPlaceholderText: {
//     fontSize: 16,
//     color: "#A0A0A0",
//   },
//   pickerContainer: {
//     backgroundColor: "#FFF",
//     borderRadius: 8,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#FFF",
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     paddingBottom: Platform.OS === "ios" ? 30 : 0,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//   },
//   modalHeaderText: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   closeButton: {
//     padding: 8,
//   },
//   closeButtonText: {
//     color: "#537FE7",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   modalPicker: {
//     height: 200,
//   },
//   termsContainer: {
//     marginVertical: 15,
//   },
//   termsText: {
//     fontSize: 14,
//     color: "#666",
//     lineHeight: 20,
//   },
//   linkText: {
//     color: "#537FE7",
//     fontWeight: "600",
//   },
//   registerButton: {
//     backgroundColor: "#537FE7",
//     height: 55,
//     borderRadius: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#537FE7",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,
//     marginTop: 10,
//   },
//   disabledButton: {
//     backgroundColor: "#A0A0A0",
//     shadowColor: "#A0A0A0",
//   },
//   registerButtonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   footerContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 15,
//   },
//   footerText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   signinText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#537FE7",
//   },
//   navbarSpacing: {
//     height: 100,
//   },
// });

// export default register;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const register = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const API_URL =
    Platform.OS === "android"
      ? "http://10.12.48.52:5000/api/auth/signup"
      : "http://10.12.48.52:5000/api/auth/signup";

  const bloodTypeOptions = [
    { label: "Select Blood Type", value: "" },
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
  ];

  const validateInputs = () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !bloodType ||
      !age ||
      !weight ||
      !height
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }

    // Basic phone validation
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert("Error", "Please enter a valid phone number (10-15 digits)");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    console.log("Starting registration process...");

    try {
      const userData = {
        name: fullName,
        email: email,
        password: password,
        phone: phone,
        bloodType: bloodType,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
      };

      console.log("Sending request to:", API_URL);
      console.log("With data:", JSON.stringify(userData));

      // Add timeout to prevent infinite waiting
      const fetchPromise = fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out")), 10000); // 10 second timeout
      });

      // Race the fetch against the timeout
      const response = await Promise.race([fetchPromise, timeoutPromise]);

      console.log("Response received:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.push("/login") },
      ]);
    } catch (error) {
      console.error("Registration error:", error);

      // Handle specific network errors
      if (error.message === "Network request failed") {
        Alert.alert(
          "Connection Error",
          "Could not connect to the server. Please check your network connection and ensure the server is running.",
          [{ text: "OK" }]
        );
      } else if (error.message === "Request timed out") {
        Alert.alert(
          "Timeout Error",
          "The request took too long to complete. Please try again later.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert("Error", error.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
      console.log("Registration process completed");
    }
  };

  const renderBloodTypeItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.bloodTypeItem,
        bloodType === item.value && styles.selectedBloodTypeItem,
      ]}
      onPress={() => {
        setBloodType(item.value);
        setShowPicker(false);
      }}
    >
      <Text
        style={[
          styles.bloodTypeText,
          bloodType === item.value && styles.selectedBloodTypeText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F4FBFC" barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Create Account</Text>
              <Text style={styles.subHeaderText}>Sign up to get started</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#A0A0A0"
                  autoCapitalize="words"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234567890"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={15}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Blood Type</Text>
                <TouchableOpacity
                  style={styles.pickerButton}
                  onPress={() => setShowPicker(true)}
                >
                  <Text
                    style={
                      bloodType
                        ? styles.pickerSelectedText
                        : styles.pickerPlaceholderText
                    }
                  >
                    {bloodType || "Select Blood Type"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#A0A0A0"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <View style={styles.rowContainer}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Age (years)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="25"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                    maxLength={3}
                  />
                </View>

                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.inputLabel}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="70"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="numeric"
                    value={weight}
                    onChangeText={setWeight}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Height (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="175"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                  maxLength={3}
                />
              </View>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By registering, you agree to our{" "}
                  <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.registerButton,
                  isLoading && styles.disabledButton,
                ]}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.signinText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.navbarSpacing} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Custom modal for Blood Type selection */}
      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Select Blood Type</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={bloodTypeOptions}
              renderItem={renderBloodTypeItem}
              keyExtractor={(item) => item.value}
              style={styles.bloodTypeList}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBFC",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  pickerButton: {
    backgroundColor: "#FFF",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
  },
  pickerSelectedText: {
    fontSize: 16,
    color: "#000",
  },
  pickerPlaceholderText: {
    fontSize: 16,
    color: "#A0A0A0",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#537FE7",
    fontSize: 16,
    fontWeight: "600",
  },
  bloodTypeList: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  bloodTypeItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  selectedBloodTypeItem: {
    backgroundColor: "#EDF2FF",
  },
  bloodTypeText: {
    fontSize: 16,
    color: "#000",
  },
  selectedBloodTypeText: {
    color: "#537FE7",
    fontWeight: "600",
  },
  termsContainer: {
    marginVertical: 15,
  },
  termsText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  linkText: {
    color: "#537FE7",
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#537FE7",
    height: 55,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#537FE7",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
    shadowColor: "#A0A0A0",
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  signinText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#537FE7",
  },
  navbarSpacing: {
    height: 100,
  },
});

export default register;
