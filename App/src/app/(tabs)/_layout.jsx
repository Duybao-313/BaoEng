import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Tabs } from "expo-router";

import { colors } from "../../constants/theme";
import { useSettings } from "../../providers";
import { useAuth } from "../../store/auth";

const TABS = [
  { name: "index", title: "Trang chủ", icon: "home", activeIcon: "home" },
  { name: "progress", title: "Tiến độ", icon: "bar-chart", activeIcon: "bar-chart" },
  {
    name: "notifications",
    title: "Thông báo",
    icon: "notifications-none",
    activeIcon: "notifications",
  },
  { name: "profile", title: "Hồ sơ", icon: "person-outline", activeIcon: "person" },
];

/**
 * Bo cuc bottom tab bar cua app (Trang chu, Tien do, Thong bao, Ho so).
 * Chua dang nhap => dua ve man hinh Dang nhap.
 */
export default function TabsLayout() {
  const { session } = useAuth();
  const { t } = useSettings();

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "transparent" },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: t(tab.title),
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialIcons
                name={focused ? tab.activeIcon : tab.icon}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
