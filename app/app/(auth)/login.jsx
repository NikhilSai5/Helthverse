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
// } from "react-native";
// import React, { useState } from "react";
// import { useRouter } from "expo-router";

// const login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     console.log("Login attempt with:", email, password);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor="#F4FBFC" barStyle="dark-content" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardAvoid}
//       >
//         <View style={styles.contentContainer}>
//           <View style={styles.headerContainer}>
//             <Text style={styles.headerText}>Welcome Back</Text>
//             <Text style={styles.subHeaderText}>Sign in to continue</Text>
//           </View>

//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="your@email.com"
//                 placeholderTextColor="#A0A0A0"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.inputLabel}>Password</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="••••••••"
//                 placeholderTextColor="#A0A0A0"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//               />
//             </View>

//             <TouchableOpacity style={styles.forgotContainer}>
//               <Text style={styles.forgotText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//               <Text style={styles.loginButtonText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.footerContainer}>
//             <Text style={styles.footerText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => router.push("/register")}>
//               <Text style={styles.signupText}>Sign Up</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.navbarSpacing} />
//         </View>
//       </KeyboardAvoidingView>
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
//   contentContainer: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   headerContainer: {
//     marginBottom: 30,
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
//   forgotContainer: {
//     alignSelf: "flex-end",
//     marginBottom: 20,
//   },
//   forgotText: {
//     color: "#537FE7",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   loginButton: {
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
//   },
//   loginButtonText: {
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
//   signupText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#537FE7",
//   },

//   navbarSpacing: {
//     height: 100,
//   },
// });

// export default login;

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
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_URL =
    Platform.OS === "android"
      ? "http://10.12.48.52:5000/api/auth/login"
      : "http://10.12.48.52:5000/api/auth/login";

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    console.log("Starting login process...");

    try {
      const loginData = {
        email: email,
        password: password,
      };

      console.log("Sending request to:", API_URL);
      console.log("With data:", JSON.stringify(loginData));

      // Add timeout to prevent infinite waiting
      const fetchPromise = fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
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
        throw new Error(data.message || "Login failed");
      }

      // Store the JWT token in AsyncStorage
      if (data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userEmail", email);

        console.log("Token stored successfully");
        console.log("User email stored successfully");

        router.push("/Homepage");
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error("Login error:", error);

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
        Alert.alert(
          "Login Failed",
          error.message || "Invalid email or password. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
      console.log("Login process completed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F4FBFC" barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome Back</Text>
            <Text style={styles.subHeaderText}>Sign in to continue</Text>
          </View>

          <View style={styles.formContainer}>
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

            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => router.push("/forgot-password")}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.navbarSpacing} />
        </View>
      </KeyboardAvoidingView>
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
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 30,
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
  forgotContainer: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#537FE7",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
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
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
    shadowColor: "#A0A0A0",
  },
  loginButtonText: {
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
  signupText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#537FE7",
  },
  navbarSpacing: {
    height: 100,
  },
});

export default login;
