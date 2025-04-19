import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        if (
          [
            "_sitemap",
            "+not-found",
            "(auth)/login",
            "(auth)/register",
          ].includes(route.name) ||
          route.name.toLowerCase().includes("prescription")
        ) {
          return null;
        }

        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const label = options.title || route.name.split("/").pop();

        const color = isFocused ? "#3B82F6" : "#FFFFFF";

        let icon = null;
        const screenName = route.name.split("/").pop().toLowerCase();

        if (screenName === "homepage") {
          icon = <Feather name="home" size={24} color={color} />;
        } else if (screenName === "profile") {
          icon = <Feather name="user" size={24} color={color} />;
        } else if (screenName === "chatbot") {
          icon = <MaterialIcons name="sticky-note-2" size={24} color={color} />;
        } else if (screenName === "report") {
          icon = <Entypo name="bar-graph" size={24} color={color} />;
        } else {
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
