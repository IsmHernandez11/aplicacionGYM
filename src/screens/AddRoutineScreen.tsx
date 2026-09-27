import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
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
  const [featured, setFeatured] = useState(false);

  // Estados de validación de errores
  const [errors, setErrors] = useState<{
    name?: string;
    muscleGroup?: string;
    duration?: string;
  }>({});

  // Cargar datos al editar
  useEffect(() => {
    if (idToEdit) {
      const routineFound = routines.find((routine) => routine.id === idToEdit);

      if (routineFound) {
        setName(routineFound.name);
        setMuscleGroup(routineFound.muscleGroup);
        setDurationString(routineFound.duration.toString());
        setFeatured(Boolean(routineFound.featured));
      }
    }
  }, [idToEdit]);

  // Función de validación exhaustiva
  const validateForm = (): boolean => {
    const newErrors: { name?: string; muscleGroup?: string; duration?: string } = {};

    // 1. Validar nombre obligatorio
    if (!name.trim()) {
      newErrors.name = "El nombre de la rutina es obligatorio.";
    }

    // 2. Validar grupo muscular obligatorio
    if (!muscleGroup.trim()) {
      newErrors.muscleGroup = "El grupo muscular es obligatorio.";
    }

    // 3. Validar duración numérica entre 10 y 180 minutos
    if (!durationString.trim()) {
      newErrors.duration = "La duración es obligatoria.";
    } else {
      const durationNum = Number(durationString);
      if (isNaN(durationNum)) {
        newErrors.duration = "La duración debe ser un número válido.";
      } else if (durationNum < 10 || durationNum > 180) {
        newErrors.duration = "La duración debe estar entre 10 y 180 minutos.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar o actualizar rutina
  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert(
        "Formulario no válido",
        "Por favor corriga los errores marcados antes de continuar."
      );
      return; // Importante: NO se regresa a la lista mientras existan errores
    }

    const durationNumber = parseFloat(durationString);

    if (idToEdit) {
      updateRoutine(idToEdit, {
        name: name.trim(),
        muscleGroup: muscleGroup.trim(),
        duration: durationNumber,
        featured,
      });
    } else {
      addRoutine({
        name: name.trim(),
        muscleGroup: muscleGroup.trim(),
        duration: durationNumber,
        featured,
      });
    }

    // Regresar a la lista solo cuando todo está correcto
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
          <Text style={styles.label}>
            Nombre de la rutina <Text style={styles.requiredAsterisk}>*</Text>
          </Text>
          <View
            style={[
              styles.inputContainer,
              Boolean(errors.name) && styles.inputContainerError,
            ]}
          >
            <View style={styles.inputIconBox}>
              <Ionicons name="barbell-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Ej. Hipertrofia Pecho & Tríceps"
              placeholderTextColor={colors.textDisabled}
            />
          </View>
          {errors.name && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text style={styles.errorText}>{errors.name}</Text>
            </View>
          )}
        </View>

        {/* Campo 2: Grupo Muscular con Chips */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Grupo muscular <Text style={styles.requiredAsterisk}>*</Text>
          </Text>
          <View
            style={[
              styles.inputContainer,
              Boolean(errors.muscleGroup) && styles.inputContainerError,
            ]}
          >
            <View style={styles.inputIconBox}>
              <Ionicons name="fitness-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={muscleGroup}
              onChangeText={(text) => {
                setMuscleGroup(text);
                if (errors.muscleGroup) setErrors((prev) => ({ ...prev, muscleGroup: undefined }));
              }}
              placeholder="Ej. Piernas / Glúteos"
              placeholderTextColor={colors.textDisabled}
            />
          </View>
          {errors.muscleGroup && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text style={styles.errorText}>{errors.muscleGroup}</Text>
            </View>
          )}

          {/* Chips de selección rápida */}
          <View style={styles.chipsRow}>
            {MUSCLE_SHORTCUTS.map((shortcut) => {
              const isSelected = muscleGroup.toLowerCase() === shortcut.toLowerCase();
              return (
                <TouchableOpacity
                  key={shortcut}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setMuscleGroup(shortcut);
                    if (errors.muscleGroup)
                      setErrors((prev) => ({ ...prev, muscleGroup: undefined }));
                  }}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {shortcut}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Campo 3: Duración (10 a 180 min) */}
        <View style={styles.field}>
          <Text style={styles.label}>
            Duración estimada (10 - 180 min) <Text style={styles.requiredAsterisk}>*</Text>
          </Text>
          <View
            style={[
              styles.inputContainer,
              Boolean(errors.duration) && styles.inputContainerError,
            ]}
          >
            <View style={styles.inputIconBox}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
            </View>
            <TextInput
              style={styles.input}
              value={durationString}
              onChangeText={(text) => {
                setDurationString(text);
                if (errors.duration) setErrors((prev) => ({ ...prev, duration: undefined }));
              }}
              keyboardType="numeric"
              placeholder="Ej. 45"
              placeholderTextColor={colors.textDisabled}
            />
            <Text style={styles.inputUnit}>min</Text>
          </View>
          {errors.duration && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color={colors.danger} />
              <Text style={styles.errorText}>{errors.duration}</Text>
            </View>
          )}
        </View>

        {/* Campo 4: Destacar Rutina (Única rutina destacada) */}
        <View style={styles.featuredToggleRow}>
          <View style={styles.featuredToggleInfo}>
            <View style={styles.starIconBox}>
              <Ionicons name="star" size={18} color="#FFB300" />
            </View>
            <View style={styles.featuredToggleCopy}>
              <Text style={styles.featuredToggleTitle}>Marcar como Destacada</Text>
              <Text style={styles.featuredToggleSub}>
                Reemplazará a cualquier otra rutina destacada actual.
              </Text>
            </View>
          </View>
          <Switch
            value={featured}
            onValueChange={setFeatured}
            trackColor={{ false: colors.border, true: "rgba(255, 179, 0, 0.4)" }}
            thumbColor={featured ? "#FFB300" : colors.textMuted}
          />
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
    marginBottom: 18,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  requiredAsterisk: {
    color: colors.danger,
    fontWeight: "800",
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
  inputContainerError: {
    borderColor: colors.danger,
    backgroundColor: "rgba(255, 59, 48, 0.08)",
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
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600",
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
  featuredToggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: "rgba(255, 179, 0, 0.3)",
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
  },
  featuredToggleInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  starIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(255, 179, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  featuredToggleCopy: {
    flex: 1,
  },
  featuredToggleTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "800",
  },
  featuredToggleSub: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
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


