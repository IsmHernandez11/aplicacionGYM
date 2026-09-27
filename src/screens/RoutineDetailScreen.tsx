import { View, Text, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoutines } from "../context/RoutineContext";
import { colors } from "../theme/colors";

export default function RoutineDetailScreen({ route }: any) {
  const { routines, toggleFeatured } = useRoutines();

  // Recibimos el id enviado desde RoutineListScreen
  const idToView = route.params?.id;

  // Buscamos la rutina correspondiente
  const routine = routines.find((r) => r.id === idToView);

  // Por si no existe la rutina
  if (!routine) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundCard}>
          <View style={styles.notFoundIconBox}>
            <Ionicons name="alert-circle-outline" size={38} color={colors.primary} />
          </View>
          <Text style={styles.notFoundTitle}>Rutina no encontrada</Text>
          <Text style={styles.notFoundSub}>
            Esta rutina pudo haber sido eliminada o el enlace no es válido.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isFeatured = Boolean(routine.featured);
  const createdDate = new Date(routine.createdAt).toLocaleDateString();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Hero */}
        <ImageBackground
          source={require("../../assets/chest-workout-hero.png")}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroHeaderRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>ENTRENAMIENTO</Text>
              </View>

              {isFeatured && (
                <View style={styles.featuredBadge}>
                  <Ionicons name="star" size={12} color="#FFB300" />
                  <Text style={styles.featuredBadgeText}>DESTACADA</Text>
                </View>
              )}
            </View>

            <Text style={styles.heroTitle}>{routine.name}</Text>
            <View style={styles.heroMetaRow}>
              <Ionicons name="flash" size={14} color={colors.primary} />
              <Text style={styles.heroMetaText}>Plan personalizado de fuerza</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Tarjetas de Métricas Principales */}
        <Text style={styles.sectionHeader}>Métricas de Sesión</Text>

        <View style={styles.statsGrid}>
          {/* Card 1: Grupo muscular */}
          <View style={styles.metricCard}>
            <View style={styles.metricIconBox}>
              <Ionicons name="barbell" size={22} color={colors.primary} />
            </View>
            <Text style={styles.metricLabel}>Grupo muscular</Text>
            <Text style={styles.metricValue}>{routine.muscleGroup}</Text>
          </View>

          {/* Card 2: Duración */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconBox, styles.durationIconBox]}>
              <Ionicons name="time" size={22} color={colors.accent} />
            </View>
            <Text style={styles.metricLabel}>Duración estimada</Text>
            <Text style={styles.metricValue}>{routine.duration} mins</Text>
          </View>
        </View>

        {/* Tarjeta de Información Adicional */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Fecha de creación</Text>
              <Text style={styles.infoValue}>{createdDate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIconBox}>
              <Ionicons
                name={isFeatured ? "star" : "star-outline"}
                size={20}
                color={isFeatured ? "#FFB300" : colors.textSecondary}
              />
            </View>
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>Destacado en Resumen</Text>
              <Text style={[styles.infoValue, { color: isFeatured ? "#FFB300" : colors.textSecondary }]}>
                {isFeatured ? "Sí, esta rutina está destacada" : "No está destacada"}
              </Text>
            </View>
          </View>
        </View>

        {/* Tip Motivacional */}
        <View style={styles.tipCard}>
          <Ionicons name="flame" size={24} color={colors.primary} />
          <View style={styles.tipCopy}>
            <Text style={styles.tipTitle}>Consejo de rendimiento</Text>
            <Text style={styles.tipText}>
              Mantén periodos de descanso de 60 a 90 segundos entre series para maximizar la hipertrofia.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 32,
  },
  hero: {
    height: 190,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: {
    borderRadius: 22,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
    backgroundColor: "rgba(10, 13, 20, 0.72)",
  },
  heroHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 179, 0, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 179, 0, 0.4)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  featuredBadgeText: {
    color: "#FFB300",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.6,
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  heroMetaText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  sectionHeader: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 16,
  },
  metricIconBox: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryMuted,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 45, 85, 0.25)",
    marginBottom: 14,
  },
  durationIconBox: {
    backgroundColor: colors.accentMuted,
    borderColor: "rgba(255, 115, 54, 0.25)",
  },
  metricLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metricValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  infoIconBox: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceElevated,
    borderRadius: 12,
  },
  infoCopy: {
    flex: 1,
    marginLeft: 14,
  },
  infoLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.surfaceCard,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 18,
  },
  tipCopy: {
    flex: 1,
  },
  tipTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "800",
  },
  tipText: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  notFoundCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 32,
    marginTop: 40,
    marginHorizontal: 20,
  },
  notFoundIconBox: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryMuted,
    borderRadius: 22,
    marginBottom: 16,
  },
  notFoundTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
  },
  notFoundSub: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },
});

