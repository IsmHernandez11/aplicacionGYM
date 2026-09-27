import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { colors } from "../theme/colors";

export default function ProgressScreen({ navigation }: any) {
  const { routines } = useRoutines();

  // 1. Total de rutinas
  const totalRoutines = routines.length;

  // 2. Duración total en minutos
  const totalDurationMinutes = routines.reduce((sum, r) => sum + Number(r.duration || 0), 0);

  // Formato horas y minutos
  const hours = Math.floor(totalDurationMinutes / 60);
  const remainingMins = totalDurationMinutes % 60;
  const formattedTotalTime =
    hours > 0 ? `${hours}h ${remainingMins}m` : `${totalDurationMinutes} min`;

  // 3. Duración promedio en minutos
  const avgDurationMinutes =
    totalRoutines > 0 ? Math.round(totalDurationMinutes / totalRoutines) : 0;

  // 4. Grupo muscular con mayor cantidad de rutinas (frecuencia)
  const groupFrequencies: Record<string, number> = {};
  routines.forEach((r) => {
    const group = r.muscleGroup ? r.muscleGroup.trim() : "Otros";
    groupFrequencies[group] = (groupFrequencies[group] || 0) + 1;
  });

  let topMuscleGroup = "Sin datos";
  let maxCount = 0;
  Object.entries(groupFrequencies).forEach(([group, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topMuscleGroup = group;
    }
  });

  // 5. Rutina Destacada (persistida en SQLite)
  const featuredRoutine = routines.find((r) => r.featured);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Cabecera */}
        <View style={styles.badgeRow}>
          <View style={styles.statusDot} />
          <Text style={styles.eyebrow}>RESUMEN EN TIEMPO REAL</Text>
        </View>
        <Text style={styles.title}>Tu Progreso</Text>
        <Text style={styles.subtitle}>
          Métricas dinámicas calculadas automáticamente desde tus rutinas guardadas.
        </Text>

        {/* Tarjeta de Rutina Destacada (ACTIVIDAD 4) */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeaderRow}>
            <Ionicons name="star" size={18} color="#FFB300" />
            <Text style={styles.sectionHeaderTitle}>Rutina Destacada</Text>
          </View>

          {featuredRoutine ? (
            <View style={styles.featuredHeroCard}>
              <View style={styles.featuredHeroBadge}>
                <Ionicons name="star" size={12} color="#FFB300" />
                <Text style={styles.featuredHeroBadgeText}>SELECCIONADA COMO DESTACADA</Text>
              </View>

              <Text style={styles.featuredHeroTitle}>{featuredRoutine.name}</Text>

              <View style={styles.featuredMetaRow}>
                <View style={styles.featuredMetaChip}>
                  <Ionicons name="barbell-outline" size={14} color="#ffffff" />
                  <Text style={styles.featuredMetaChipText}>{featuredRoutine.muscleGroup}</Text>
                </View>

                <View style={styles.featuredMetaChip}>
                  <Ionicons name="time-outline" size={14} color="#ffffff" />
                  <Text style={styles.featuredMetaChipText}>{featuredRoutine.duration} minutos</Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.noFeaturedCard}>
              <Ionicons name="star-outline" size={28} color={colors.textMuted} />
              <View style={styles.noFeaturedCopy}>
                <Text style={styles.noFeaturedTitle}>No hay rutina destacada</Text>
                <Text style={styles.noFeaturedSub}>
                  Haz clic en la estrella de cualquier rutina en "Mis Rutinas" para destacarla aquí.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Grid de 4 Métricas Dinámicas Principales */}
        <Text style={styles.sectionTitle}>Estadísticas Generales</Text>

        <View style={styles.gridContainer}>
          {/* Métrica 1: Total de Rutinas */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconBox, { backgroundColor: colors.primaryMuted }]}>
              <Ionicons name="list" size={22} color={colors.primary} />
            </View>
            <Text style={styles.metricValue}>{totalRoutines}</Text>
            <Text style={styles.metricLabel}>Total Rutinas</Text>
          </View>

          {/* Métrica 2: Duración Total */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconBox, { backgroundColor: colors.accentMuted }]}>
              <Ionicons name="time" size={22} color={colors.accent} />
            </View>
            <Text style={styles.metricValue}>{formattedTotalTime}</Text>
            <Text style={styles.metricLabel}>Duración Total</Text>
          </View>

          {/* Métrica 3: Duración Promedio */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconBox, { backgroundColor: "rgba(0, 230, 118, 0.15)" }]}>
              <Ionicons name="speedometer-outline" size={22} color={colors.success} />
            </View>
            <Text style={styles.metricValue}>{avgDurationMinutes} min</Text>
            <Text style={styles.metricLabel}>Promedio por Sesión</Text>
          </View>

          {/* Métrica 4: Grupo Muscular Principal */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconBox, { backgroundColor: "rgba(255, 179, 0, 0.15)" }]}>
              <Ionicons name="body-outline" size={22} color="#FFB300" />
            </View>
            <Text style={styles.metricValue} numberOfLines={1}>
              {topMuscleGroup}
            </Text>
            <Text style={styles.metricLabel}>
              {maxCount > 0 ? `Mayor Enfoque (${maxCount})` : "Grupo Principal"}
            </Text>
          </View>
        </View>

        {/* Desglose de Frecuencia por Grupo Muscular */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownHeader}>
            <Text style={styles.breakdownTitle}>Distribución por Grupo Muscular</Text>
            <Text style={styles.breakdownSub}>Basado en tus {totalRoutines} rutinas</Text>
          </View>

          {Object.keys(groupFrequencies).length === 0 ? (
            <Text style={styles.emptyBreakdownText}>Agrega rutinas para visualizar el desglose.</Text>
          ) : (
            Object.entries(groupFrequencies).map(([group, count]) => {
              const percentage =
                totalRoutines > 0 ? Math.round((count / totalRoutines) * 100) : 0;
              return (
                <View style={styles.groupRow} key={group}>
                  <View style={styles.groupInfoRow}>
                    <Text style={styles.groupName}>{group}</Text>
                    <Text style={styles.groupCount}>
                      {count} {count === 1 ? "rutina" : "rutinas"} ({percentage}%)
                    </Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View style={[styles.progressBar, { width: `${percentage}%` }]} />
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 36,
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
    fontSize: 28,
    fontWeight: "900",
    color: colors.textPrimary,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 5,
    marginBottom: 18,
    lineHeight: 19,
  },
  featuredSection: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  featuredHeroCard: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1.5,
    borderColor: "#FFB300",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#FFB300",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  featuredHeroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 179, 0, 0.2)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  featuredHeroBadgeText: {
    color: "#FFB300",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  featuredHeroTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.4,
    marginBottom: 12,
  },
  featuredMetaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  featuredMetaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  featuredMetaChipText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  noFeaturedCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
  },
  noFeaturedCopy: {
    flex: 1,
  },
  noFeaturedTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "800",
  },
  noFeaturedSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 17,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: "48%",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 16,
  },
  metricIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  breakdownCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 18,
  },
  breakdownHeader: {
    marginBottom: 16,
  },
  breakdownTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  breakdownSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  emptyBreakdownText: {
    color: colors.textMuted,
    fontSize: 13,
    fontStyle: "italic",
  },
  groupRow: {
    marginBottom: 14,
  },
  groupInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  groupName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  groupCount: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});


