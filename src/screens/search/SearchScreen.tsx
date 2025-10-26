import React, { useState, useCallback, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Animated,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '@/config/theme';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';
import { Structure } from '@/models';
import { structuresService } from '@/api';
import { StructureCard, EmptyState, LoadingSpinner } from '@/components/common';
import { SearchViewModal } from './SearchViewModal';
import { FiltersDialog, SearchFilters } from './FiltersDialog';

type SearchScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Search'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export default function SearchScreen() {
    const navigation = useNavigation<SearchScreenNavigationProp>();
    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [structures, setStructures] = useState<Structure[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [showFiltersModal, setShowFiltersModal] = useState(false);
    const [activeFilters, setActiveFilters] = useState<SearchFilters>({});

    const handleSearch = useCallback(async (query?: string) => {
        const trimmedQuery = (query || searchQuery).trim();
        if (!trimmedQuery) {
            setStructures([]);
            return;
        }

        if (query) {
            setSearchQuery(query);
        }

        try {
            setIsLoading(true);
            setHasSearched(true);
            setError(null);

            const response = await structuresService.search({
                query: trimmedQuery,
                sport: activeFilters.discipline,
                // TODO: Ajouter region, departement, type quand l'API les supporte
            });

            setStructures(response.data || []);

            if (response.source === 'mock') {
                setError("Résultats de démonstration affichés pendant l'indisponibilité de l'API.");
            }
        } catch (err) {
            console.error('Erreur recherche:', err);
            setError('Erreur lors de la recherche');
            setStructures([]);
        } finally {
            setIsLoading(false);
        }
    }, [searchQuery, activeFilters]);

    const handleRefresh = useCallback(async () => {
        if (!searchQuery.trim()) {
            setIsRefreshing(false);
            return;
        }
        setIsRefreshing(true);
        await handleSearch();
        setIsRefreshing(false);
    }, [handleSearch, searchQuery]);

    const handleStructurePress = (structure: Structure, index: number) => {
        // Navigate to root stack screen from nested tab navigator
        // Passer la structure complète ET le tableau pour le swipe
        const parent = navigation.getParent();
        if (parent) {
            parent.navigate('StructureDetails', {
                structureId: structure.id,
                structure: structure,  // Structure actuelle
                searchResults: structures,  // Tableau complet pour swipe
                initialIndex: index  // Index de la structure cliquée
            });
        }
    };

    const handleOpenFilters = () => {
        setShowFiltersModal(true);
    };

    const handleApplyFilters = (filters: SearchFilters) => {
        setActiveFilters(filters);
        // Relancer la recherche avec les nouveaux filtres si on a déjà une query
        if (searchQuery.trim()) {
            handleSearch();
        }
    };

    const handleOpenSearchModal = () => {
        setShowSearchModal(true);
    };

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <SafeAreaView edges={['top']} style={styles.headerContent}>
                {/* Top bar avec logo/titre/profil */}
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

                {/* Barre de recherche blanche */}
                <TouchableOpacity
                    style={styles.searchBarContainer}
                    onPress={handleOpenSearchModal}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} />
                    <Text style={styles.searchPlaceholder}>
                        Rechercher un club ou une ville...
                    </Text>
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <MaterialCommunityIcons name="close" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handleOpenFilters}>
                        <MaterialCommunityIcons name="filter-variant" size={20} color={colors.primary} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );

    const renderEmptyState = () => {
        if (isLoading) return null;

        const title = hasSearched ? 'Aucune structure trouvée' : 'Recherchez une structure';
        const message = hasSearched
            ? 'Essayez un autre lieu ou une autre orthographe.'
            : 'Saisissez une ville, un club ou un département pour lancer une recherche.';

        return <EmptyState icon="map-search" title={title} message={message} />;
    };

    return (
        <View style={styles.container}>
            {renderHeader()}

            {/* Section blanche avec coins arrondis */}
            <View style={styles.mainContent}>
                {isLoading && !isRefreshing ? (
                    <LoadingSpinner />
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={structures}
                        renderItem={({ item, index }) => (
                            <StructureCard
                                structure={item}
                                onPress={() => handleStructurePress(item, index)}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={renderEmptyState}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={handleRefresh}
                                colors={[colors.primary]}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            {
                                useNativeDriver: false,
                                listener: (event: any) => {
                                    const offsetY = event.nativeEvent.contentOffset.y;
                                    setShowScrollToTop(offsetY > 200);
                                },
                            }
                        )}
                    />
                )}

                {error && (
                    <View style={styles.errorBanner}>
                        <MaterialCommunityIcons name="alert-circle" size={20} color={colors.warning} />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
            </View>

            {/* FABs */}
            {showScrollToTop && (
                <TouchableOpacity style={[styles.fab, styles.fabScrollTop]} onPress={scrollToTop}>
                    <MaterialCommunityIcons name="chevron-up" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )}
            {structures.length > 0 && !isLoading && (
                <TouchableOpacity 
                    style={[styles.fab, styles.fabMap]}
                    onPress={() => {
                        const parent = navigation.getParent();
                        if (parent) {
                            parent.navigate('MapView', { structures });
                        }
                    }}
                >
                    <MaterialCommunityIcons name="map" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            )}

            {/* Modal de recherche */}
            <SearchViewModal
                visible={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                onSearch={handleSearch}
                initialQuery={searchQuery}
            />

            {/* Dialog de filtres */}
            <FiltersDialog
                visible={showFiltersModal}
                onClose={() => setShowFiltersModal(false)}
                onApply={handleApplyFilters}
                currentFilters={activeFilters}
            />
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
        paddingBottom: spacing.md,
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
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    searchPlaceholder: {
        flex: 1,
        fontSize: 16,
        color: colors.textTertiary,
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: spacing.sm,
        overflow: 'hidden',
    },
    listContent: {
        flexGrow: 1,
        paddingTop: spacing.md,
        paddingBottom: spacing.xl * 2,
    },
    errorBanner: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.lg,
        right: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.errorLight,
        borderRadius: 12,
        padding: spacing.md,
        gap: spacing.sm,
    },
    errorText: {
        flex: 1,
        fontSize: 14,
        color: colors.error,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    fabScrollTop: {
        bottom: spacing.lg + 70,
        right: spacing.lg,
    },
    fabMap: {
        bottom: spacing.lg,
        right: spacing.lg,
    },
});
