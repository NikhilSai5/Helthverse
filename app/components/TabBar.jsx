// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import React from "react";
// import { Feather } from "@expo/vector-icons/Feather";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// const TabBar = ({ state, descriptors, navigation }) => {
//   const icons = {
//     Homepage: (props) => <Feather name="home" size={24} color={props.color} />,
//     report: (props) => (
//       <Entypo name="bar-graph" size={24} color={props.color} />
//     ),
//     Chatbot: (props) => (
//       <MaterialIcons name="sticky-note-2" size={24} color={props.color} />
//     ),
//     profile: (props) => <Feather name="user" size={24} color={props.color} />,
//   };
//   return (
//     <View style={styles.tabbar}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         if (["_sitemap", "+not-found"].includes(route.name)) return null;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: "tabLongPress",
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             key={route.key}
//             style={styles.tabbarItem}
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarButtonTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//           >
//             {/*  icons here */}
//             {icons[route.name]({ color: isFocused ? "blue" : "gray" })}

//             <Text style={{ color: isFocused ? "blue" : "gray" }}>{label}</Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabbar: {
//     position: "absolute",
//     bottom: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#0D1618",
//     marginHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 25,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 10 },
//     shadowRadius: 10,
//     shadowOpacity: 0.1,
//     borderCurve: "continuous",
//   },
//   tabbarItem: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default TabBar;
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
// Try direct imports for each icon
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        // Skip system routes
        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Get label from options or route name
        const label = options.title || route.name.split("/").pop();

        // Color based on focus state
        const color = isFocused ? "#3B82F6" : "#FFFFFF";

        // Determine which icon to show
        let icon = null;
        const screenName = route.name.split("/").pop().toLowerCase();

        // Simplified icon selection
        if (screenName === "homepage") {
          icon = <Feather name="home" size={24} color={color} />;
        } else if (screenName === "profile") {
          icon = <Feather name="user" size={24} color={color} />;
        } else if (screenName === "chatbot") {
          icon = <MaterialIcons name="sticky-note-2" size={24} color={color} />;
        } else if (screenName === "report") {
          icon = <Entypo name="bar-graph" size={24} color={color} />;
        } else {
          // Default icon
          icon = <Feather name="circle" size={24} color={color} />;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabbarItem}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icon}
            <Text
              style={{
                color: color,
                fontSize: 10,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0D1618",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    paddingHorizontal: 15,
    borderCurve: "continuous",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabBar;
