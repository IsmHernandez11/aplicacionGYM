import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";

import {
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import DrawerNavigator from "./src/navigators/DrawerNavigator";
import RoutineDetailScreen from "./src/screens/RoutineDetailScreen";
import AddRoutineScreen from "./src/screens/AddRoutineScreen";
import { RoutineProvider } from "./src/context/RoutineContext";
import { colors } from "./src/theme/colors";

// Tipos de las rutas
export type RootStackParamList = {
  DrawerNavigator: undefined;

  // Detail necesita obligatoriamente un id
  Detail: {
    id: string;
  };

  // AddRoutine puede recibir id o no
  AddRoutine: {
    id?: string;
  } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <RoutineProvider>
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: colors.primary,
            background: colors.background,
            card: colors.surface,
            text: colors.textPrimary,
            border: colors.border,
          },
        }}
      >
        <StatusBar style="light" />

        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 18,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Detail"
            component={RoutineDetailScreen}
            options={{
              title: "Detalle de Rutina",
            }}
          />

          <Stack.Screen
            name="AddRoutine"
            component={AddRoutineScreen}
            options={({ route }) => ({
              title: route.params?.id
                ? "Editar Rutina"
                : "Nueva Rutina",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RoutineProvider>
  );
}