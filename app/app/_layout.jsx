import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Slot, usePathname } from "expo-router";
import TabBar from "../components/TabBar";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/Homepage");
    }
  }, [pathname]);
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="(tabs)/Homepage"
        options={{
          title: "Home",

          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(tabs)/Doctors"
        options={{
          title: "Doctors",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(tabs)/report"
        options={{
          title: "Report",

          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(tabs)/Chatbot"
        options={{
          title: "Chatbot",

          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          title: "Profile",

          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(tabs)/Prescription"
        options={{
          title: "Prescription",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
