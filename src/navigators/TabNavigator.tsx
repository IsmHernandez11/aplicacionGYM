import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProgressScreen from "../screens/ProgressScreen";
import RoutineListScreen from "../screens/RoutineListScreen";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Usamos la cabecera del Drawer
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "fitness";
          if (route.name === "Progreso") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Listas Rutinas" || route.name === "Rutinas") {
            iconName = focused ? "list" : "list-outline";
          }

          return <Ionicons name={iconName} size={size + 1} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 0.3,
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Progreso"
        component={ProgressScreen}
        options={{
          tabBarLabel: "Progreso",
        }}
      />
      <Tab.Screen
        name="Listas Rutinas"
        component={RoutineListScreen}
        options={{
          tabBarLabel: "Mis Rutinas",
        }}
      />
    </Tab.Navigator>
  );
}


