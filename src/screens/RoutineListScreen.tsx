import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { colors } from "../theme/colors";

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine } = useRoutines();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabecera */}
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <View style={styles.badgeRow}>
            <View style={styles.statusDot} />
            <Text style={styles.eyebrow}>ENTRENAMIENTO PRO</Text>
          </View>
          <Text style={styles.title}>Mis Rutinas</Text>
          <Text style={styles.subtitle}>
            {routines.length} {routines.length === 1 ? "rutina activa" : "rutinas activas"} en tu plan
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("AddRoutine")}
        >
          <Ionicons name="add" size={26} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Lista de rutinas */}
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="barbell-outline" size={36} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Aún no tienes rutinas</Text>
            <Text style={styles.emptyText}>
              Comienza tu transformación creando tu primera rutina personalizada.
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("AddRoutine")}
            >
              <Ionicons name="add-circle-outline" size={18} color="#ffffff" />
              <Text style={styles.emptyButtonText}>Crear Rutina</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <View style={styles.routineCard}>
              {/* Borde sutil de acento lateral */}
              <View style={styles.cardAccentBar} />

              <View style={styles.cardMain}>
                <View style={styles.routineInfo}>
                  <View style={styles.cardIcon}>
                    <Ionicons name="fitness" size={22} color={colors.primary} />
                  </View>

                  <View style={styles.cardCopy}>
                    <Text style={styles.routineName} numberOfLines={1}>
                      {item.name}
                    </Text>

                    <View style={styles.metaRow}>
                      <View style={styles.muscleChip}>
                        <Text style={styles.muscleGroup}>{item.muscleGroup}</Text>
                      </View>

                      <View style={styles.durationChip}>
                        <Ionicons name="time-outline" size={13} color={colors.textSecondary} />
                        <Text style={styles.duration}>{item.duration} min</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Acciones de la tarjeta */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Detail", { id: item.id })}
                  >
                    <Ionicons name="eye-outline" size={18} color={colors.textSecondary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("AddRoutine", { id: item.id })}
                  >
                    <Ionicons name="pencil-outline" size={17} color={colors.primary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    activeOpacity={0.7}
                    onPress={() => deleteRoutine(item.id)}
                  >
                    <Ionicons name="trash-outline" size={17} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 18,
  },
  headerCopy: {
    flex: 1,
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
    marginTop: 4,
    fontWeight: "500",
  },
  addButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    marginLeft: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 14,
    flexGrow: 1,
  },
  routineCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  cardAccentBar: {
    width: 4,
    backgroundColor: colors.primary,
  },
  cardMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  routineInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryMuted,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 45, 85, 0.25)",
  },
  cardCopy: {
    flex: 1,
    marginLeft: 14,
  },
  routineName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
  muscleChip: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  muscleGroup: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "700",
  },
  durationChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 7,
    marginLeft: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deleteButton: {
    backgroundColor: colors.dangerMuted,
    borderColor: "rgba(255, 59, 48, 0.3)",
  },
  emptyCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 32,
    marginTop: 20,
  },
  emptyIconContainer: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryMuted,
    borderRadius: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 45, 85, 0.3)",
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 260,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  emptyButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
});

