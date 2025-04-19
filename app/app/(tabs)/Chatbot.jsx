// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import React, { useState } from "react";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import Ionicons from "@expo/vector-icons/Ionicons";

// const ChatBot = () => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([
//     {
//       type: "bot",
//       content:
//         "Hello! I'm your health assistant. You can ask me anything about medicines, health conditions, or doctors.",
//     },
//   ]);

//   const sendMessage = () => {
//     if (message.trim() === "") return;

//     setChatHistory([...chatHistory, { type: "user", content: message }]);

//     setTimeout(() => {
//       let botResponse =
//         "I'm sorry, I don't have information about that yet. Please consult a healthcare professional.";

//       if (message.toLowerCase().includes("headache")) {
//         botResponse =
//           "Common headache treatments include rest, hydration, and over-the-counter pain relievers like acetaminophen or ibuprofen. If headaches persist, you should consult with a doctor.";
//       } else if (
//         message.toLowerCase().includes("cold") ||
//         message.toLowerCase().includes("flu")
//       ) {
//         botResponse =
//           "For cold and flu symptoms, rest, staying hydrated, and taking decongestants may help. Antiviral medications might be prescribed for flu if caught early.";
//       } else if (message.toLowerCase().includes("doctor")) {
//         botResponse =
//           "To find the right specialist, consider your symptoms and medical history. General practitioners can provide referrals to specialists like cardiologists, dermatologists, or neurologists based on your needs.";
//       }

//       setChatHistory((prevChat) => [
//         ...prevChat,
//         { type: "bot", content: botResponse },
//       ]);
//     }, 1000);

//     setMessage("");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>Health Assistant</Text>
//       </View>

//       <ScrollView
//         style={styles.chatContainer}
//         contentContainerStyle={styles.chatContentContainer}
//       >
//         {chatHistory.map((chat, index) => (
//           <View
//             key={index}
//             style={[
//               styles.messageBubble,
//               chat.type === "user" ? styles.userBubble : styles.botBubble,
//             ]}
//           >
//             {chat.type === "bot" && (
//               <View style={styles.botAvatar}>
//                 <AntDesign name="medicinebox" size={16} color="white" />
//               </View>
//             )}
//             <View
//               style={[
//                 styles.messageContent,
//                 chat.type === "user" ? styles.userContent : styles.botContent,
//               ]}
//             >
//               <Text
//                 style={
//                   chat.type === "user" ? styles.userMessage : styles.botMessage
//                 }
//               >
//                 {chat.content}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.suggestionsContainer}
//         contentContainerStyle={styles.suggestionsContent}
//       >
//         <TouchableOpacity style={styles.suggestionChip}>
//           <Text style={styles.suggestionText}>Common cold remedies</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.suggestionChip}>
//           <Text style={styles.suggestionText}>Find a cardiologist</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.suggestionChip}>
//           <Text style={styles.suggestionText}>Headache treatment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.suggestionChip}>
//           <Text style={styles.suggestionText}>Medication side effects</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.inputContainer}
//         keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
//       >
//         <TextInput
//           style={styles.input}
//           placeholder="Ask about health, medicines, or doctors..."
//           value={message}
//           onChangeText={setMessage}
//           multiline
//         />
//         <TouchableOpacity
//           style={styles.sendButton}
//           onPress={sendMessage}
//           disabled={message.trim() === ""}
//         >
//           <Ionicons name="send" size={20} color="white" />
//         </TouchableOpacity>
//       </KeyboardAvoidingView>

//       <View style={styles.navbarSpace} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4FBFC",
//   },
//   titleContainer: {
//     paddingVertical: 15,
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#EAEAEA",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   chatContainer: {
//     flex: 1,
//     paddingHorizontal: 15,
//   },
//   chatContentContainer: {
//     paddingTop: 15,
//     paddingBottom: 10,
//   },
//   messageBubble: {
//     flexDirection: "row",
//     marginBottom: 15,
//     maxWidth: "80%",
//   },
//   botBubble: {
//     alignSelf: "flex-start",
//   },
//   userBubble: {
//     alignSelf: "flex-end",
//     justifyContent: "flex-end",
//   },
//   botAvatar: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: "#537FE7",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//   },
//   messageContent: {
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     flexShrink: 1,
//   },
//   botContent: {
//     backgroundColor: "white",
//     borderWidth: 1,
//     borderColor: "#E5E5E5",
//   },
//   userContent: {
//     backgroundColor: "#537FE7",
//   },
//   botMessage: {
//     color: "#000",
//     fontSize: 15,
//   },
//   userMessage: {
//     color: "white",
//     fontSize: 15,
//   },
//   suggestionsContainer: {
//     maxHeight: 50,
//     marginVertical: 10,
//   },
//   suggestionsContent: {
//     paddingHorizontal: 15,
//   },
//   suggestionChip: {
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: "#537FE7",
//   },
//   suggestionText: {
//     color: "#537FE7",
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: "white",
//     borderTopWidth: 1,
//     borderTopColor: "#EAEAEA",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#F4FBFC",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     maxHeight: 100,
//     fontSize: 16,
//     borderRadius: 20,
//     borderWidth: 0.5,
//     borderColor: "#537FE7",
//   },
//   sendButton: {
//     backgroundColor: "#537FE7",
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 10,
//   },
//   navbarSpace: {
//     height: 110,
//   },
// });

// export default ChatBot;

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

// Replace with your actual API key
const API_KEY = "AIzaSyCaflwoMklUmnTvOyb2EEu0mZKnxxF8mjs";
// Note: Updating to most recent endpoint and model
const API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your health assistant. You can ask me anything about medicines, health conditions, or doctors.",
    },
  ]);

  const scrollViewRef = useRef();

  // Function to scroll to bottom of chat
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  // Effect to scroll to bottom when chat history changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Function to generate content using Gemini API via fetch
  const generateResponse = async (userMessage) => {
    try {
      // Create a chat history context for the AI
      const conversationContext = chatHistory
        .filter((msg) => !msg.isTyping)
        .map(
          (msg) =>
            `${msg.type === "user" ? "User" : "Assistant"}: ${msg.content}`
        )
        .join("\n");

      // Add the new user message to the context
      const promptWithContext = `${conversationContext}\nUser: ${userMessage}\n\nYou are a helpful health assistant. Provide accurate medical information but always recommend consulting healthcare professionals for personalized advice. Respond to the latest query about: ${userMessage}. Do not use Markdown formatting in your response. Avoid symbols like *, #, or backticks. Use plain text only.`;

      // For debugging
      console.log("Sending request to: ", `${API_URL}?key=${API_KEY}`);
      console.log(
        "Request body: ",
        JSON.stringify({
          contents: [
            {
              parts: [{ text: promptWithContext }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        })
      );

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptWithContext }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
          // Remove safety settings for now as they might be causing compatibility issues
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API response error:", errorData);
        throw new Error(
          `API request failed with status ${response.status}: ${JSON.stringify(
            errorData
          )}`
        );
      }

      const data = await response.json();
      console.log("API response:", JSON.stringify(data, null, 2));

      // Extract text from the response - updated path to match current API structure
      if (
        data &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts
      ) {
        return (
          data.candidates[0].content.parts[0].text ||
          "I couldn't generate a proper response. Please try again."
        );
      } else {
        console.error("Unexpected API response format:", data);
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again later or consult a healthcare professional directly.";
    }
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = message.trim();
    setChatHistory((prev) => [...prev, { type: "user", content: userMessage }]);
    setMessage("");
    setIsLoading(true);

    try {
      // Show typing indicator by adding a temporary message
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", content: "...", isTyping: true },
      ]);

      // Generate response from Gemini
      const botResponse = await generateResponse(userMessage);

      // Remove typing indicator and add actual response
      setChatHistory((prev) => {
        const newHistory = prev.filter((msg) => !msg.isTyping);
        return [...newHistory, { type: "bot", content: botResponse }];
      });
    } catch (error) {
      // Handle errors
      setChatHistory((prev) => {
        const newHistory = prev.filter((msg) => !msg.isTyping);
        return [
          ...newHistory,
          {
            type: "bot",
            content:
              "I encountered an issue processing your request. Please try again.",
          },
        ];
      });
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setMessage(suggestion);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Health Assistant</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
      >
        {chatHistory.map((chat, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              chat.type === "user" ? styles.userBubble : styles.botBubble,
            ]}
          >
            {chat.type === "bot" && (
              <View style={styles.botAvatar}>
                <AntDesign name="medicinebox" size={16} color="white" />
              </View>
            )}
            <View
              style={[
                styles.messageContent,
                chat.type === "user" ? styles.userContent : styles.botContent,
                chat.isTyping ? styles.typingContent : null,
              ]}
            >
              <Text
                style={
                  chat.type === "user" ? styles.userMessage : styles.botMessage
                }
              >
                {chat.content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.suggestionsContainer}
        contentContainerStyle={styles.suggestionsContent}
      >
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => handleSuggestionPress("Common cold remedies")}
        >
          <Text style={styles.suggestionText}>Common cold remedies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => handleSuggestionPress("Find a cardiologist")}
        >
          <Text style={styles.suggestionText}>Find a cardiologist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => handleSuggestionPress("Headache treatment")}
        >
          <Text style={styles.suggestionText}>Headache treatment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.suggestionChip}
          onPress={() => handleSuggestionPress("Medication side effects")}
        >
          <Text style={styles.suggestionText}>Medication side effects</Text>
        </TouchableOpacity>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
      >
        <TextInput
          style={styles.input}
          placeholder="Ask about health, medicines, or doctors..."
          value={message}
          onChangeText={setMessage}
          multiline
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            isLoading ? styles.sendButtonDisabled : null,
          ]}
          onPress={sendMessage}
          disabled={message.trim() === "" || isLoading}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={styles.navbarSpace} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBFC",
  },
  titleContainer: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  chatContentContainer: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  messageBubble: {
    flexDirection: "row",
    marginBottom: 15,
    maxWidth: "80%",
  },
  botBubble: {
    alignSelf: "flex-start",
  },
  userBubble: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#537FE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  messageContent: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexShrink: 1,
  },
  botContent: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  typingContent: {
    backgroundColor: "#E8E8E8",
  },
  userContent: {
    backgroundColor: "#537FE7",
  },
  botMessage: {
    color: "#000",
    fontSize: 15,
  },
  userMessage: {
    color: "white",
    fontSize: 15,
  },
  suggestionsContainer: {
    maxHeight: 50,
    marginVertical: 10,
  },
  suggestionsContent: {
    paddingHorizontal: 15,
  },
  suggestionChip: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#537FE7",
  },
  suggestionText: {
    color: "#537FE7",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
  },
  input: {
    flex: 1,
    backgroundColor: "#F4FBFC",
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#537FE7",
  },
  sendButton: {
    backgroundColor: "#537FE7",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: "#B0C4DE",
  },
  navbarSpace: {
    height: 110,
  },
});

export default ChatBot;
