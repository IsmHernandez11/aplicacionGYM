import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import TabNavigator from "./TabNavigator";
import { colors } from "../theme/colors";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: "800",
          fontSize: 19,
        },
        headerShadowVisible: false,
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
          width: 280,
          borderRightColor: colors.border,
          borderRightWidth: 1,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerActiveBackgroundColor: colors.primaryMuted,
        drawerItemStyle: {
          borderRadius: 14,
          marginHorizontal: 12,
          marginVertical: 4,
          paddingHorizontal: 8,
        },
        drawerLabelStyle: {
          fontWeight: "700",
          fontSize: 14,
          marginLeft: -8,
        },
      }}
    >
      <Drawer.Screen
        name="Entrenamiento de Ana"
        component={TabNavigator}
        options={{
          title: "GymPro Training",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}


