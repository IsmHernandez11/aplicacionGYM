import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { colors } from "../theme/colors";

const MUSCLE_SHORTCUTS = ["Pecho", "Espalda", "Piernas", "Brazos", "Hombros", "Cardio"];

export default function AddRoutineScreen({ navigation, route }: any) {
  const { addRoutine, updateRoutine, routines } = useRoutines();

  // Si llega un id, estamos editando
  const idToEdit = route.params?.id;

  // Estados de los inputs
  const [name, setName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [durationString, setDurationString] = useState("");

  // Si existe un id, buscamos la rutina y llenamos los inputs
  useEffect(() => {
    if (idToEdit) {
      const routineFound = routines.find((routine) => routine.id === idToEdit);

      if (routineFound) {
        setName(routineFound.name);
        setMuscleGroup(routineFound.muscleGroup);
        setDurationString(routineFound.duration.toString());
      }
    }
  }, [idToEdit]);

  // Guardar o actualizar
  const handleSave = () => {
    // Validar campos vacíos
    if (!name || !muscleGroup || !durationString) {
      Alert.alert("Campos requeridos", "Por favor completa todos los datos para continuar.");
      return;
    }

    // Convertir duración a número
    const durationNumber = parseFloat(durationString);

    // Validar que sea número
    if (isNaN(durationNumber) || durationNumber <= 0) {
      Alert.alert("Duración no válida", "La duración debe ser un número mayor a 0.");
      return;
    }

    // Si hay id -> actualizar
    if (idToEdit) {
      updateRoutine(idToEdit, {
        name,
        muscleGroup,
        duration: durationNumber,
      });
    }
    // Si no hay id -> crear
    else {
      addRoutine({
        name,
        muscleGroup,
        duration: durationNumber,
      });
    }

    // Regresar a la pantalla anterior
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <View style={styles.statusDot} />
          <Text style={styles.eyebrow}>
            {idToEdit ? "EDICIÓN DE SESIÓN" : "NUEVA SESIÓN"}
          </Text>
        </View>
        <Text style={styles.title}>
          {idToEdit ? "Editar Rutina" : "Crear Rutina"}
        </Text>
        <Text style={styles.subtitle}>
          Configura los detalles de tu plan de entrenamiento para alcanzar tus objetivos.
        </Text>
      </View>

      <View style={styles.formCard}>
        {/* Campo 1: Nombre */}
        <View style={styles.field}>
          <Text style={styles.label}>Nombre de la rutina</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIconBox}>
              <Ionicons name="barbell-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ej. Hipertrofia Pecho & Tríceps"
              placeholderTextColor={colors.textDisabled}
            />
          </View>
        </View>

        {/* Campo 2: Grupo Muscular con Chips */}
        <View style={styles.field}>
          <Text style={styles.label}>Grupo muscular</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIconBox}>
              <Ionicons name="fitness-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={muscleGroup}
              onChangeText={setMuscleGroup}
              placeholder="Ej. Piernas / Glúteos"
              placeholderTextColor={colors.textDisabled}
            />
          </View>

          {/* Chips de selección rápida */}
          <View style={styles.chipsRow}>
            {MUSCLE_SHORTCUTS.map((shortcut) => {
              const isSelected = muscleGroup.toLowerCase() === shortcut.toLowerCase();
              return (
                <TouchableOpacity
                  key={shortcut}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  activeOpacity={0.7}
                  onPress={() => setMuscleGroup(shortcut)}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {shortcut}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Campo 3: Duración */}
        <View style={[styles.field, styles.lastField]}>
          <Text style={styles.label}>Duración estimada (minutos)</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIconBox}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={durationString}
              onChangeText={setDurationString}
              keyboardType="numeric"
              placeholder="Ej. 45"
              placeholderTextColor={colors.textDisabled}
            />
            <Text style={styles.inputUnit}>min</Text>
          </View>
        </View>
      </View>

      {/* Botón de Guardar */}
      <TouchableOpacity
        style={styles.saveButton}
        activeOpacity={0.8}
        onPress={handleSave}
      >
        <Ionicons
          name={idToEdit ? "checkmark-circle" : "add-circle"}
          size={22}
          color="#ffffff"
        />
        <Text style={styles.saveButtonText}>
          {idToEdit ? "Actualizar Rutina" : "Guardar Rutina"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 36,
  },
  header: {
    marginBottom: 20,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  field: {
    marginBottom: 20,
  },
  lastField: {
    marginBottom: 0,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  inputContainer: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
  },
  inputIconBox: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryMuted,
    borderRadius: 9,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: 12,
  },
  inputUnit: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    marginRight: 4,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  chip: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 10,
  },
  chipSelected: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  chipTextSelected: {
    color: colors.primary,
    fontWeight: "800",
  },
  saveButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 16,
    marginTop: 22,
    paddingHorizontal: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});

