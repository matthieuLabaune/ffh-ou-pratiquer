/**
 * Design System - FFH Où Pratiquer (parité Flutter)
 *
 * Ce fichier centralise les tokens de design utilisés dans l'app React Native.
 * Il reflète la charte mise en place sur l'application Flutter de référence
 * (cf. DESIGN-GUIDE.md) : palette sobre, fonds clairs, textes contrastés et
 * tags colorés par discipline/territoire.
 */

const textPalette = {
    primary: '#212121',
    secondary: '#757575',
    tertiary: '#9E9E9E',
    muted: '#BDBDBD',
    inverse: '#FFFFFF',
};

const tagPalette = {
    region: '#3949AB',
    department: '#1E88E5',
};

const disciplinePalette = {
    hockey: '#1976D2',
    handball: '#F57C00',
    basketball: '#E64A19',
    football: '#388E3C',
    swimming: '#0288D1',
    tennis: '#7B1FA2',
    athletics: '#FFB300',
    rugby: '#5D4037',
    default: '#616161',
};

// Couleurs FFH - palette dérivée du projet Flutter
export const colors = {
    // Couleurs principales - Flutter theme
    primary: '#283593', // Bleu indigo foncé
    secondary: '#673AB7', // Violet pour compte
    accent: '#FFA000', // Orange pour "GO" dans HANDIGO

    // Couleurs de fond
    background: '#FFFFFF',
    surface: '#F2F2F7',
    surfaceVariant: '#E5E5EA',
    cardBackground: '#FAFAFA', // Gris très clair pour les cartes

    // Couleurs de texte
    text: '#000000',
    textSecondary: '#3C3C43',
    textTertiary: '#8E8E93',
    textOnPrimary: '#FFFFFF',

    // Couleurs d'état
    error: '#FF3B30',
    errorLight: '#FFE5E5',
    success: '#34C759',
    warning: '#FF9500',
    info: '#007AFF',

    // Couleurs de tags/badges - Flutter style
    regionTag: '#283593', // Indigo foncé pour région
    departementTag: '#1976D2', // Bleu pour département
    disciplineTagBg: '#F3E5F5', // Violet clair pour fond discipline
    disciplineTagBorder: '#E1BEE7', // Violet pour bordure discipline
    disciplineTagText: '#6A1B9A', // Violet foncé pour texte discipline

    // Navigation
    navBackground: '#EDE7F6', // Indigo très clair
    navActive: '#283593',
    navInactive: '#757575',

    // Overlay & bordures
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    border: '#BDBDBD', // Gris moyen pour bordures
    cardBorder: '#9E9E9E', // Gris plus foncé pour bordures de carte
    separator: '#E5E5EA',
};

export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
};

export const fontFamilies = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
};

export const typography = {
    h1: {
        fontSize: 24,
        fontWeight: '700' as const,
        lineHeight: 32,
        letterSpacing: 0.15,
    },
    h2: {
        fontSize: 20,
        fontWeight: '600' as const,
        lineHeight: 28,
        letterSpacing: 0.1,
    },
    h3: {
        fontSize: 18,
        fontWeight: '700' as const,
        lineHeight: 24,
        letterSpacing: 0.1,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 24,
        letterSpacing: 0.1,
    },
    body: {
        fontSize: 16,
        fontWeight: '400' as const,
        lineHeight: 24,
        letterSpacing: 0.2,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: '400' as const,
        lineHeight: 20,
        letterSpacing: 0.1,
    },
    caption: {
        fontSize: 12,
        fontWeight: '500' as const,
        lineHeight: 16,
        letterSpacing: 0.4,
    },
    button: {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 24,
        letterSpacing: 0.5,
    },
    overline: {
        fontSize: 11,
        fontWeight: '600' as const,
        lineHeight: 16,
        letterSpacing: 1,
        textTransform: 'uppercase' as const,
    },
};

export const borderRadius = {
    xsmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 20,
    round: 24,
    pill: 999,
};

export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    subtle: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    soft: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },
};

// Helper pour obtenir la couleur d'une discipline - Flutter style (toutes violettes)
export const getDisciplineColor = (discipline: string): string => {
    // Dans le style Flutter, toutes les disciplines ont la même couleur violette
    return colors.disciplineTagBg;
};

export const theme = {
    colors,
    spacing,
    typography,
    borderRadius,
    shadows,
    fontFamilies,
    getDisciplineColor,
};

export default theme;
