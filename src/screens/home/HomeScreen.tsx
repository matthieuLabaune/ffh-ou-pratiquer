import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '@/config/theme';
import { RootStackParamList } from '@/navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuButtonProps {
    title: string;
    subtitle: string;
    iconName: string;
    color: string;
    onPress: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
    title,
    subtitle,
    iconName,
    color,
    onPress,
}) => {
    return (
        <TouchableOpacity style={styles.menuCard} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={iconName as any} size={24} color="#FFFFFF" />
            </View>
            <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{title}</Text>
                <Text style={styles.menuSubtitle}>{subtitle}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={16} color="#BDBDBD" />
        </TouchableOpacity>
    );
};

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    // TODO: Charger les statistiques réelles depuis l'API
    const stats = {
        sports: '113',
        structures: '1 760',
        licenses: '26 049',
    };

    return (
        <View style={styles.container}>
            {/* Header avec fond bleu indigo */}
            <View style={styles.header}>
                <SafeAreaView edges={['top']} style={styles.headerContent}>
                    {/* Logo + Titre + Icône profil */}
                    <View style={styles.topBar}>
                        <View style={styles.logoContainer}>
                            <MaterialCommunityIcons name="wheelchair" size={20} color={colors.primary} />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleHandi}>HANDI</Text>
                            <Text style={styles.titleGo}>GO</Text>
                        </View>
                        <TouchableOpacity style={styles.profileIcon}>
                            <MaterialCommunityIcons name="account-circle" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {/* Statistiques */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.sports}</Text>
                            <Text style={styles.statLabel}>Sports</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.structures}</Text>
                            <Text style={styles.statLabel}>Structures</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{stats.licenses}</Text>
                            <Text style={styles.statLabel}>Licences</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </View>

            {/* Section blanche avec coins arrondis */}
            <View style={styles.mainContent}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.sectionTitle}>Que voulez-vous faire ?</Text>

                    <MenuButton
                        title="Où pratiquer ?"
                        subtitle="Trouvez des structures sportives adaptées"
                        iconName="map-marker"
                        color={colors.primary}
                        onPress={() => {
                            // Navigation vers l'onglet Search du MainNavigator
                        }}
                    />

                    <MenuButton
                        title="Mon Compte"
                        subtitle="Accédez à votre espace personnel"
                        iconName="account-circle"
                        color={colors.secondary}
                        onPress={() => {
                            // Navigation vers l'onglet Account du MainNavigator
                        }}
                    />

                    <MenuButton
                        title="Médiathèque"
                        subtitle="Ressources et guides accessibilité"
                        iconName="book-open-variant"
                        color="#1976D2"
                        onPress={() => {
                            // TODO: Navigation médiathèque
                        }}
                    />

                    <View style={styles.footerSpace}>
                        <TouchableOpacity>
                            <Text style={styles.privacyLink}>Confidentialité</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    header: {
        backgroundColor: colors.primary,
        paddingBottom: spacing.lg,
    },
    headerContent: {
        paddingHorizontal: spacing.lg,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: spacing.sm,
        paddingBottom: spacing.md,
    },
    logoContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        marginLeft: spacing.sm,
    },
    titleHandi: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1.2,
    },
    titleGo: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.accent,
        letterSpacing: 1.2,
    },
    profileIcon: {
        marginLeft: 'auto',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: spacing.sm,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statLabel: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: 4,
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: spacing.md,
        overflow: 'hidden',
    },
    scrollContent: {
        padding: spacing.xl,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.xl,
        marginTop: spacing.md,
    },
    menuCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 14,
        marginBottom: 4,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuTextContainer: {
        flex: 1,
        marginLeft: spacing.md,
    },
    menuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    menuSubtitle: {
        fontSize: 12,
        color: colors.textTertiary,
        marginTop: 4,
    },
    footerSpace: {
        marginTop: spacing.xl * 2,
        alignItems: 'center',
    },
    privacyLink: {
        color: colors.textTertiary,
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
