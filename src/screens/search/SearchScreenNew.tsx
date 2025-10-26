import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import {
    Text,
    FAB,
    SegmentedButtons,
    Chip,
    ActivityIndicator,
    Banner,
    Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Structure } from '@/models';
import { structuresService } from '@/api';
import { useLocation } from '@/hooks';
import { StructureCard, SearchBar, EmptyState } from '@/components/common';
import { colors, spacing, borderRadius } from '@/config/theme';
import { RootStackParamList } from '@/navigation/types';

const DEFAULT_RADIUS_KM = 10;

type ViewMode = 'list' | 'map';

type SearchOptions = {
    useLocation?: boolean;
};

export default function SearchScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { location, requestLocation, isLoading: locationLoading } = useLocation();

    const [searchQuery, setSearchQuery] = useState('');
    const [lastQuery, setLastQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const [structures, setStructures] = useState<Structure[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [showFilters, setShowFilters] = useState(false);
    const [isLocationFilterEnabled, setIsLocationFilterEnabled] = useState(false);

    const performSearch = useCallback(
        async (queryValue: string, options: SearchOptions = {}) => {
            const trimmedQuery = queryValue.trim();

            if (!trimmedQuery) {
                setStructures([]);
                setError(null);
                return;
            }

            const shouldUseLocation = options.useLocation ?? (isLocationFilterEnabled && !!location);

            if (shouldUseLocation && !location) {
                setError('Localisation en cours...');
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                const response = await structuresService.search({
                    query: trimmedQuery,
                    latitude: shouldUseLocation ? location?.latitude : undefined,
                    longitude: shouldUseLocation ? location?.longitude : undefined,
                    radius: shouldUseLocation ? DEFAULT_RADIUS_KM : undefined,
                });

                setStructures(response.data || []);

                if (response.source === 'mock') {
                    setError(
                        shouldUseLocation
                            ? "La recherche géolocalisée est temporairement indisponible (affichage des données de démonstration)."
                            : "Résultats de démonstration affichés pendant l'indisponibilité de l'API.",
                    );
                }
            } catch (err) {
                console.error('Erreur recherche:', err);
                setError('Erreur lors de la recherche');
                setStructures([]);
            } finally {
                setIsLoading(false);
            }
        },
        [isLocationFilterEnabled, location],
    );

    const handleSearch = useCallback(async () => {
        Keyboard.dismiss();

        const trimmedQuery = searchQuery.trim();
        setHasSearched(true);
        setLastQuery(trimmedQuery);

        if (isLocationFilterEnabled && !location) {
            requestLocation();
        }

        await performSearch(trimmedQuery, { useLocation: isLocationFilterEnabled });
    }, [performSearch, searchQuery, isLocationFilterEnabled, location, requestLocation]);

    const handleRefresh = useCallback(async () => {
        if (!lastQuery) {
            setIsRefreshing(false);
            return;
        }

        setIsRefreshing(true);
        await performSearch(lastQuery, { useLocation: isLocationFilterEnabled });
        setIsRefreshing(false);
    }, [performSearch, lastQuery, isLocationFilterEnabled]);

    useEffect(() => {
        if (hasSearched && lastQuery && isLocationFilterEnabled && location) {
            performSearch(lastQuery, { useLocation: true });
        }
    }, [location, hasSearched, lastQuery, isLocationFilterEnabled, performSearch]);

    const handleStructurePress = (structure: Structure) => {
        navigation.navigate('StructureDetails', { structureId: structure.id });
    };

    const renderStructureItem = ({ item }: { item: Structure }) => (
        <StructureCard structure={item} onPress={handleStructurePress} />
    );

    const renderEmptyState = () => {
        if (isLoading) {
            return null;
        }

        const title = hasSearched ? 'Aucune structure trouvée' : 'Recherchez une structure';
        const message = hasSearched
            ? 'Essayez un autre lieu ou une autre orthographe.'
            : 'Saisissez une ville, un club ou un département pour lancer une recherche.';

        return <EmptyState icon="map-search" title={title} message={message} />;
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.searchContainer}>
                        <SearchBar
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Rechercher par ville, club ou département"
                            onSubmitEditing={handleSearch}
                        />
                        <Button
                            mode="contained"
                            icon="magnify"
                            onPress={handleSearch}
                            loading={isLoading}
                            disabled={isLoading || (isLocationFilterEnabled && locationLoading)}
                            style={styles.searchButton}
                            contentStyle={styles.searchButtonContent}
                        >
                            Rechercher
                        </Button>
                    </View>

                    {error && (
                        <Banner visible actions={[]} style={styles.errorBanner}>
                            <Text>{error}</Text>
                        </Banner>
                    )}

                    <View style={styles.viewModeContainer}>
                        <SegmentedButtons
                            value={viewMode}
                            onValueChange={(value) => setViewMode(value as ViewMode)}
                            buttons={[
                                { value: 'list', label: 'Liste', icon: 'view-list' },
                                { value: 'map', label: 'Carte', icon: 'map' },
                            ]}
                            style={styles.segmentedButtons}
                        />
                    </View>

                    <View style={styles.locationContainer}>
                        <Chip
                            selected={isLocationFilterEnabled}
                            onPress={() => {
                                if (!isLocationFilterEnabled && !location) {
                                    requestLocation();
                                }
                                setIsLocationFilterEnabled((prev) => !prev);
                            }}
                            icon={isLocationFilterEnabled ? 'crosshairs-gps' : 'crosshairs'}
                            style={[
                                styles.locationChip,
                                isLocationFilterEnabled && styles.locationChipSelected,
                            ]}
                            textStyle={[
                                styles.locationChipText,
                                isLocationFilterEnabled && styles.locationChipTextSelected,
                            ]}
                        >
                            {isLocationFilterEnabled
                                ? `Géolocalisation activée (${DEFAULT_RADIUS_KM} km)`
                                : `Près de moi (${DEFAULT_RADIUS_KM} km)`}
                        </Chip>
                    </View>

                    {viewMode === 'list' ? (
                        <FlatList
                            data={structures}
                            renderItem={renderStructureItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.listContainer}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={handleRefresh}
                                    colors={[colors.primary]}
                                />
                            }
                            ListEmptyComponent={renderEmptyState}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <View style={styles.mapPlaceholder}>
                            <Text variant="titleLarge" style={styles.mapPlaceholderText}>
                                🗺️ Vue carte
                            </Text>
                            <Text variant="bodyMedium" style={styles.mapPlaceholderSubtext}>
                                Fonctionnalité à venir
                            </Text>
                        </View>
                    )}

                    <FAB
                        icon="filter"
                        style={styles.fab}
                        onPress={() => setShowFilters((prev) => !prev)}
                        label={showFilters ? 'Masquer' : 'Filtres'}
                        visible={!isLoading}
                    />

                    {isLoading && !isRefreshing && (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
    },
    searchContainer: {
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
        gap: spacing.sm,
    },
    searchButton: {
        alignSelf: 'center',
        borderRadius: borderRadius.round,
        marginHorizontal: spacing.lg,
    },
    searchButtonContent: {
        paddingVertical: spacing.sm,
    },
    errorBanner: {
        backgroundColor: colors.errorLight,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.sm,
    },
    viewModeContainer: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    segmentedButtons: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.medium,
    },
    locationContainer: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm,
    },
    locationChip: {
        backgroundColor: colors.surfaceVariant,
        alignSelf: 'flex-start',
    },
    locationChipSelected: {
        backgroundColor: colors.success,
    },
    locationChipText: {
        color: colors.text,
    },
    locationChipTextSelected: {
        color: colors.textOnPrimary,
        fontWeight: '600',
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: spacing.xl * 2,
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surfaceVariant,
        margin: spacing.lg,
        borderRadius: borderRadius.large,
    },
    mapPlaceholderText: {
        color: colors.textSecondary,
        marginBottom: spacing.sm,
    },
    mapPlaceholderSubtext: {
        color: colors.textTertiary,
    },
    fab: {
        position: 'absolute',
        bottom: spacing.lg,
        right: spacing.lg,
        backgroundColor: colors.primary,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.overlayLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
