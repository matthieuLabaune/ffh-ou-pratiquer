import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {
    Text,
    Card,
    Button,
    ActivityIndicator,
    Chip,
    IconButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { Structure } from '@/models';
import { structuresService } from '@/api';
import { useLocation } from '@/hooks';
import { StructureCard } from '@/components/common/StructureCardNew';
import { colors, spacing } from '@/config/theme';

const { width } = Dimensions.get('window');



export default function HomeScreenNew() {
    const navigation = useNavigation();
    const { location, requestLocation, isLoading: locationLoading } = useLocation();


    const [nearbyStructures, setNearbyStructures] = useState<Structure[]>([]);
    const [loadingNearby, setLoadingNearby] = useState(false);

    useEffect(() => {
        requestLocation();
    }, []);

    useEffect(() => {
        if (location) {
            loadNearbyStructures();
        }
    }, [location]);

    const loadNearbyStructures = async () => {
        if (!location) return;

        try {
            setLoadingNearby(true);
            console.log('🔄 Chargement des structures à proximité...');

            // TODO: Temporairement désactivé en attendant la correction Laravel
            // const response = await structuresService.getNearby(
            //   location.latitude,
            //   location.longitude,
            //   10
            // );

            // Pour l'instant, on charge juste quelques structures sans géolocalisation
            const response = await structuresService.search({ pageSize: 3 });

            setNearbyStructures(response.data.slice(0, 3)); // Top 3
            console.log('✅ Structures récentes:', response.data.length);
        } catch (error) {
            console.error('❌ Erreur chargement structures:', error);
        } finally {
            setLoadingNearby(false);
        }
    };

    const handleStructurePress = (structure: Structure) => {
        console.log('Structure sélectionnée:', structure.name);
        // navigation.navigate('StructureDetail', { structureId: structure.id });
    };

    const navigateToSearch = () => {
        // navigation.navigate('Search');
        console.log('Navigation vers recherche');
    };

    const navigateToMap = () => {
        // navigation.navigate('Map');
        console.log('Navigation vers carte');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* En-tête avec gradient */}
                <LinearGradient
                    colors={colors.gradient.primary as [string, string]}
                    style={styles.header}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.headerContent}>
                        <View>
                            <Text variant="headlineMedium" style={styles.headerTitle}>
                                FFH Où Pratiquer
                            </Text>
                            <Text variant="titleMedium" style={styles.headerSubtitle}>
                                Trouvez votre structure handisport
                            </Text>
                        </View>

                        <View style={styles.headerActions}>
                            <IconButton
                                icon="map"
                                iconColor={colors.textOnPrimary}
                                size={24}
                                onPress={navigateToMap}
                                style={styles.headerButton}
                            />
                        </View>
                    </View>
                </LinearGradient>

                {/* Actions principales */}
                <View style={styles.mainActions}>
                    <Button
                        mode="contained"
                        icon="magnify"
                        onPress={navigateToSearch}
                        style={styles.searchButton}
                        contentStyle={styles.searchButtonContent}
                    >
                        Rechercher une structure
                    </Button>

                    <Button
                        mode="outlined"
                        icon="crosshairs-gps"
                        onPress={requestLocation}
                        loading={locationLoading}
                        style={styles.locationButton}
                    >
                        {location ? 'Actualiser ma position' : 'Activer la géolocalisation'}
                    </Button>
                </View>

                {/* Structures à proximité */}
                {location && (
                    <Card style={styles.nearbyCard}>
                        <Card.Content>
                            <View style={styles.nearbyHeader}>
                                <Text variant="titleLarge" style={styles.nearbyTitle}>
                                    📍 Près de vous
                                </Text>
                                {loadingNearby && (
                                    <ActivityIndicator size="small" color={colors.primary} />
                                )}
                            </View>

                            {nearbyStructures.length > 0 ? (
                                <View style={styles.nearbyList}>
                                    {nearbyStructures.map((structure) => (
                                        <StructureCard
                                            key={structure.id}
                                            structure={structure}
                                            onPress={handleStructurePress}
                                        />
                                    ))}

                                    <Button
                                        mode="outlined"
                                        onPress={navigateToSearch}
                                        style={styles.seeMoreButton}
                                    >
                                        Voir plus de structures
                                    </Button>
                                </View>
                            ) : (
                                <View style={styles.nearbyEmpty}>
                                    <Text style={styles.nearbyEmptyText}>
                                        Aucune structure trouvée à proximité
                                    </Text>
                                    <Button
                                        mode="text"
                                        onPress={() => loadNearbyStructures()}
                                        disabled={loadingNearby}
                                    >
                                        Actualiser
                                    </Button>
                                </View>
                            )}
                        </Card.Content>
                    </Card>
                )}

                {/* Message d'information */}
                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.infoTitle}>
                            💡 Le saviez-vous ?
                        </Text>
                        <Text style={styles.infoText}>
                            La Fédération Française Handisport développe et organise la pratique sportive des personnes en situation de handicap moteur et sensoriel.
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: spacing.xl,
    },
    header: {
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    headerTitle: {
        color: colors.textOnPrimary,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },
    headerSubtitle: {
        color: colors.textOnPrimary,
        opacity: 0.9,
    },
    headerActions: {
        flexDirection: 'row',
    },
    headerButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    mainActions: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
        gap: spacing.md,
    },
    searchButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
    },
    searchButtonContent: {
        paddingVertical: spacing.sm,
    },
    locationButton: {
        borderColor: colors.primary,
        borderRadius: 12,
    },


    nearbyCard: {
        marginHorizontal: spacing.md,
        marginBottom: spacing.lg,
        borderRadius: 16,
        elevation: 2,
    },
    nearbyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    nearbyTitle: {
        fontWeight: '700',
        color: colors.text,
    },
    nearbyList: {
        gap: spacing.sm,
    },
    seeMoreButton: {
        marginTop: spacing.md,
        borderColor: colors.primary,
    },
    nearbyEmpty: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    nearbyEmptyText: {
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    infoCard: {
        marginHorizontal: spacing.md,
        borderRadius: 16,
        elevation: 1,
        backgroundColor: colors.handisport.lightBlue,
    },
    infoTitle: {
        fontWeight: '600',
        marginBottom: spacing.sm,
        color: colors.primary,
    },
    infoText: {
        color: colors.textSecondary,
        lineHeight: 20,
    },
});
