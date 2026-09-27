import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { colors } from "../theme/colors";

const CATEGORIES = ["Todos", "Pecho", "Espalda", "Piernas", "Brazos", "Hombros", "Cardio"];

export default function RoutineListScreen({ navigation }: any) {
  const { routines, deleteRoutine, toggleFeatured, isLoading } = useRoutines();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtrado dinámico sobre la lista proveniente del Context API
  const filteredRoutines = routines.filter((routine) => {
    if (selectedCategory === "Todos") return true;
    return routine.muscleGroup.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabecera principal */}
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <View style={styles.badgeRow}>
            <View style={styles.statusDot} />
            <Text style={styles.eyebrow}>ENTRENAMIENTO PRO</Text>
          </View>
          <Text style={styles.title}>Mis Rutinas</Text>
          <Text style={styles.subtitle}>
            {routines.length} {routines.length === 1 ? "rutina en total" : "rutinas en total"}
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

      {/* Barra Horizontal de Filtros por Grupo Muscular */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            // Contar cuantas rutinas hay de cada grupo
            const count =
              category === "Todos"
                ? routines.length
                : routines.filter((r) =>
                    r.muscleGroup.toLowerCase().includes(category.toLowerCase())
                  ).length;

            return (
              <TouchableOpacity
                key={category}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                  {category}
                </Text>
                <View style={[styles.countBadge, isSelected && styles.countBadgeSelected]}>
                  <Text style={[styles.countText, isSelected && styles.countTextSelected]}>
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Indicador de carga si SQLite está respondiendo */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando rutinas...</Text>
        </View>
      ) : (
        /* Lista de Rutinas */
        <FlatList
          data={filteredRoutines}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="barbell-outline" size={38} color={colors.primary} />
              </View>
              <Text style={styles.emptyTitle}>No hay rutinas encontradas</Text>
              <Text style={styles.emptyText}>
                {selectedCategory === "Todos"
                  ? "Comienza tu transformación creando tu primera rutina personalizada."
                  : `No existen rutinas en la categoría "${selectedCategory}".`}
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
            const isFeatured = Boolean(item.featured);

            return (
              <View style={[styles.routineCard, isFeatured && styles.featuredCard]}>
                {/* Indicador lateral de acento */}
                <View
                  style={[
                    styles.cardAccentBar,
                    isFeatured && styles.cardAccentBarFeatured,
                  ]}
                />

                <View style={styles.cardMain}>
                  <View style={styles.routineInfo}>
                    <View style={[styles.cardIcon, isFeatured && styles.cardIconFeatured]}>
                      <Ionicons
                        name={isFeatured ? "star" : "fitness"}
                        size={22}
                        color={isFeatured ? "#FFB300" : colors.primary}
                      />
                    </View>

                    <View style={styles.cardCopy}>
                      {/* Badge de Rutina Destacada */}
                      {isFeatured && (
                        <View style={styles.featuredBadge}>
                          <Ionicons name="star" size={11} color="#FFB300" />
                          <Text style={styles.featuredBadgeText}>DESTACADA</Text>
                        </View>
                      )}

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
                    {/* Botón de destacar (Estrella) */}
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        isFeatured && styles.starButtonActive,
                      ]}
                      activeOpacity={0.7}
                      onPress={() => toggleFeatured(item.id)}
                    >
                      <Ionicons
                        name={isFeatured ? "star" : "star-outline"}
                        size={18}
                        color={isFeatured ? "#FFB300" : colors.textSecondary}
                      />
                    </TouchableOpacity>

                    {/* Botón ver detalles */}
                    <TouchableOpacity
                      style={styles.actionButton}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate("Detail", { id: item.id })}
                    >
                      <Ionicons name="eye-outline" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>

                    {/* Botón editar */}
                    <TouchableOpacity
                      style={styles.actionButton}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate("AddRoutine", { id: item.id })}
                    >
                      <Ionicons name="pencil-outline" size={17} color={colors.primary} />
                    </TouchableOpacity>

                    {/* Botón eliminar */}
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
      )}
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
    paddingBottom: 12,
  },
  headerCopy: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
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
    marginTop: 2,
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
  filterSection: {
    marginBottom: 12,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
    paddingVertical: 4,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterChipSelected: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  filterChipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
  },
  filterChipTextSelected: {
    color: colors.primary,
    fontWeight: "800",
  },
  countBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  countBadgeSelected: {
    backgroundColor: "rgba(255, 45, 85, 0.25)",
  },
  countText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
  },
  countTextSelected: {
    color: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: 12,
    fontSize: 14,
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
  featuredCard: {
    borderColor: "rgba(255, 179, 0, 0.45)",
    backgroundColor: "#191B24",
  },
  cardAccentBar: {
    width: 4,
    backgroundColor: colors.primary,
  },
  cardAccentBarFeatured: {
    backgroundColor: "#FFB300",
  },
  cardMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  routineInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryMuted,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 45, 85, 0.25)",
  },
  cardIconFeatured: {
    backgroundColor: "rgba(255, 179, 0, 0.15)",
    borderColor: "rgba(255, 179, 0, 0.4)",
  },
  cardCopy: {
    flex: 1,
    marginLeft: 12,
  },
  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 179, 0, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 179, 0, 0.35)",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  featuredBadgeText: {
    color: "#FFB300",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
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
    gap: 6,
    marginLeft: 8,
  },
  actionButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceElevated,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  starButtonActive: {
    backgroundColor: "rgba(255, 179, 0, 0.15)",
    borderColor: "rgba(255, 179, 0, 0.4)",
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


