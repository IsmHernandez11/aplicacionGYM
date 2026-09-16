import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const options = [
  {
    icon: "person-outline",
    title: "Perfil",
    detail: "Tus datos personales y peso objetivo",
    iconColor: colors.primary,
    bgColor: colors.primaryMuted,
  },
  {
    icon: "notifications-outline",
    title: "Notificaciones",
    detail: "Recordatorios de entrenamiento diario",
    iconColor: colors.accent,
    bgColor: colors.accentMuted,
  },
  {
    icon: "color-palette-outline",
    title: "Apariencia",
    detail: "Tema oscuro Pro activado",
    iconColor: colors.success,
    bgColor: colors.successMuted,
  },
  {
    icon: "shield-checkmark-outline",
    title: "Privacidad",
    detail: "Seguridad de cuenta y sincronización",
    iconColor: "#38BDF8",
    bgColor: "rgba(56, 189, 248, 0.15)",
  },
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Cabecera */}
        <View style={styles.badgeRow}>
          <View style={styles.statusDot} />
          <Text style={styles.eyebrow}>CUENTA & SISTEMA</Text>
        </View>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>Personaliza tu experiencia de entrenamiento.</Text>

        {/* Tarjeta de Perfil Atleta */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={28} color="#ffffff" />
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.profileName}>Atleta GymPro</Text>
            <View style={styles.levelRow}>
              <View style={styles.levelDot} />
              <Text style={styles.profileLevel}>Nivel Intermedio</Text>
            </View>
          </View>
          <View style={styles.proBadge}>
            <Ionicons name="sparkles" size={11} color="#ffffff" />
            <Text style={styles.proText}>PRO</Text>
          </View>
        </View>

        {/* Preferencias */}
        <Text style={styles.sectionTitle}>Preferencias de Aplicación</Text>
        <View style={styles.optionsCard}>
          {options.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.option, index < options.length - 1 && styles.optionBorder]}
              key={option.title}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.bgColor }]}>
                <Ionicons name={option.icon as any} size={20} color={option.iconColor} />
              </View>
              <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDetail}>{option.detail}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Marca GymPro Footer */}
        <View style={styles.brandCard}>
          <View style={styles.brandMark}>
            <Ionicons name="barbell" size={24} color="#ffffff" />
          </View>
          <Text style={styles.brandName}>
            GYM<Text style={styles.brandAccent}>PRO</Text>
          </Text>
          <Text style={styles.version}>Versión 1.0.0 • Dark Athletic Edition</Text>
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
    marginBottom: 20,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 18,
    marginBottom: 26,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  profileCopy: {
    flex: 1,
    marginLeft: 14,
  },
  profileName: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  levelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  profileLevel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  proBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  proText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  optionsCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  optionCopy: {
    flex: 1,
    marginLeft: 14,
  },
  optionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  optionDetail: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  brandCard: {
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 10,
  },
  brandMark: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  brandName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  brandAccent: {
    color: colors.primary,
  },
  version: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 6,
    fontWeight: "600",
  },
});

