export const palette = {
  pastel: {
    blue: "#FFC8B3",
    coral: "#FF7F66",
    mint: "#FFE6D8",
  },
  neutral: {
    background: "#FFF9F3",
    surface: "#FFFFFF",
    border: "#F2D7C9",
    textPrimary: "#6B3A33",
    textSecondary: "#9B665A",
    textMuted: "#C09184",
    textInverse: "#FFFFFF",
  },
} as const;

export const colors = {
  background: palette.neutral.background,
  surface: palette.neutral.surface,
  surfaceMuted: "#FFF2E8",
  border: palette.neutral.border,
  shadow: "#000000",

  primary: palette.pastel.coral,
  primaryPressed: "#F36E56",
  primaryDisabled: "#F7B3A3",
  primarySoft: "#FFD8CB",

  blue: palette.pastel.blue,
  blueDark: "#FFA88D",
  blueLight: "#FFD9C9",
  mint: palette.pastel.mint,

  successBg: "#FFF1E8",
  successText: "#D26A56",

  textPrimary: palette.neutral.textPrimary,
  textSecondary: palette.neutral.textSecondary,
  textMuted: palette.neutral.textMuted,
  textInverse: palette.neutral.textInverse,

  overlaySoft: "rgba(255,255,255,0.3)",
  overlayStrong: "rgba(255,255,255,0.45)",
  navBackground: "#FF8A72",
  navIcon: "#FFFFFF",
  navIconMuted: "#FFE7DE",
} as const;