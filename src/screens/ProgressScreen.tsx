import { Text, View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const week = [42, 68, 50, 86, 62, 94, 74];
const maxVal = Math.max(...week);

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Cabecera */}
        <View style={styles.badgeRow}>
          <View style={styles.statusDot} />
          <Text style={styles.eyebrow}>RESUMEN SEMANAL</Text>
        </View>
        <Text style={styles.title}>Tu Progreso</Text>
        <Text style={styles.subtitle}>
          Cada entrenamiento completado te acerca a tu mejor versión.
        </Text>

        {/* Hero Card */}
        <ImageBackground
          source={require("../../assets/gym-progress-hero.png")}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroLabel}>SESIONES COMPLETADAS</Text>
            </View>
            <View style={styles.heroStatsRow}>
              <Text style={styles.heroNumber}>12</Text>
              <View style={styles.heroTrendPill}>
                <Ionicons name="trending-up" size={13} color={colors.success} />
                <Text style={styles.heroCaption}>+3 este mes</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* Fila de Métricas Rápidas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Ionicons name="time" size={20} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>8h 40m</Text>
            <Text style={styles.statLabel}>Tiempo Total</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBox, styles.statIconBoxFlame]}>
              <Ionicons name="flame" size={20} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>3,240</Text>
            <Text style={styles.statLabel}>Calorías Quemadas</Text>
          </View>
        </View>

        {/* Gráfico de Actividad Semanal */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.sectionTitle}>Actividad Semanal</Text>
              <Text style={styles.chartCaption}>Rendimiento de los últimos 7 días</Text>
            </View>
            <View style={styles.changeBadge}>
              <Ionicons name="trending-up" size={14} color={colors.success} />
              <Text style={styles.changeText}>+18%</Text>
            </View>
          </View>

          <View style={styles.chart}>
            {week.map((height, index) => {
              const isPeak = height === maxVal;
              return (
                <View style={styles.barColumn} key={index}>
                  {/* Track de fondo */}
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        { height: height },
                        isPeak ? styles.barPeak : styles.barNormal,
                      ]}
                    />
                  </View>
                  <Text style={[styles.day, isPeak && styles.dayActive]}>
                    {["L", "M", "X", "J", "V", "S", "D"][index]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Tarjeta de Meta Semanal */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeaderRow}>
            <View style={styles.goalIcon}>
              <Ionicons name="trophy" size={22} color="#FFB300" />
            </View>
            <View style={styles.goalCopy}>
              <Text style={styles.goalTitle}>Meta Semanal</Text>
              <Text style={styles.goalText}>4 de 5 entrenamientos completados</Text>
            </View>
            <View style={styles.goalPercentPill}>
              <Text style={styles.goalPercent}>80%</Text>
            </View>
          </View>

          {/* Barra de Progreso Visual */}
          <View style={styles.progressTrack}>
            <View style={styles.progressBar} />
          </View>
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
  hero: {
    height: 190,
    marginBottom: 16,
    borderRadius: 22,
    overflow: "hidden",
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
    borderRadius: 22,
    backgroundColor: "rgba(10, 13, 20, 0.72)",
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  heroLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  heroStatsRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
  },
  heroNumber: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
  },
  heroTrendPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 230, 118, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroCaption: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 16,
  },
  statIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.accentMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statIconBoxFlame: {
    backgroundColor: colors.primaryMuted,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: -0.4,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  chartCaption: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.successMuted,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 230, 118, 0.3)",
  },
  changeText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "800",
  },
  chart: {
    height: 135,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 16,
    paddingHorizontal: 6,
  },
  barColumn: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
  },
  barTrack: {
    width: 20,
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.surfaceElevated,
    borderRadius: 10,
    overflow: "hidden",
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  barNormal: {
    backgroundColor: colors.primaryMuted,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  barPeak: {
    backgroundColor: colors.primary,
  },
  day: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 8,
  },
  dayActive: {
    color: colors.primary,
    fontWeight: "800",
  },
  goalCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 18,
  },
  goalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "rgba(255, 179, 0, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 179, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  goalCopy: {
    flex: 1,
    marginLeft: 14,
  },
  goalTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  goalText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  goalPercentPill: {
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  goalPercent: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    marginTop: 16,
    overflow: "hidden",
  },
  progressBar: {
    width: "80%",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});

