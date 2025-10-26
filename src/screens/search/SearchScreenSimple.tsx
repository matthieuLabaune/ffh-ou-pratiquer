import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import {
    Text,
    Searchbar,
    ActivityIndicator,
    Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Structure } from '@/models';
import { structuresService } from '@/api';
import { StructureCard } from '@/components/common/StructureCardNew';
import { colors, spacing } from '@/config/theme';

const DISCIPLINES = [
    'Toutes',
    'Basketball',
    'Tennis',
    'Natation',
    'Handball',
    'Athlétisme',
];

export default function SearchScreenSimple() {
    const [searchQuery, setSearchQuery] = useState('');
    const [structures, setStructures] = useState<Structure[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedDiscipline, setSelectedDiscipline] = useState('Toutes');

    // Chargement initial
    useEffect(() => {
        loadInitialData();
    }, []);

    // Recherche automatique
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            performSearch();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery, selectedDiscipline]);

    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            const response = await structuresService.search({});
            setStructures(response.data || []);
        } catch (err) {
            console.error('Erreur chargement initial:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const performSearch = async () => {
        try {
            setIsLoading(true);

            const searchParams: any = {};

            if (searchQuery.trim()) {
                searchParams.city = searchQuery.trim();
            }

            if (selectedDiscipline !== 'Toutes') {
                searchParams.sport = selectedDiscipline;
            }

            console.log('🔍 Recherche avec paramètres:', searchParams);
            const response = await structuresService.search(searchParams);
            console.log('📊 Résultats:', response.data?.length || 0);

            setStructures(response.data || []);
        } catch (err) {
            console.error('Erreur recherche:', err);
            setStructures([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await performSearch();
        setIsRefreshing(false);
    };

    const handleStructurePress = (structure: Structure) => {
        console.log('Structure sélectionnée:', structure.name);
    };

    const renderStructureItem = ({ item }: { item: Structure }) => (
        <StructureCard
            structure={item}
            onPress={handleStructurePress}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Barre de recherche */}
                <View style={styles.searchContainer}>
                    <Searchbar
                        placeholder="Rechercher par ville, nom..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchbar}
                        loading={isLoading}
                    />
                </View>

                {/* Filtres disciplines */}
                <View style={styles.filtersContainer}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={DISCIPLINES}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Chip
                                selected={selectedDiscipline === item}
                                onPress={() => setSelectedDiscipline(item)}
                                style={selectedDiscipline === item ? styles.filterChipSelected : styles.filterChip}
                                textStyle={selectedDiscipline === item ? styles.filterChipTextSelected : styles.filterChipText}
                            >
                                {item}
                            </Chip>
                        )}
                        contentContainerStyle={styles.filtersContent}
                    />
                </View>

                {/* Résultats */}
                {isLoading && structures.length === 0 ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                        <Text style={styles.loadingText}>Recherche en cours...</Text>
                    </View>
                ) : (
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
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    {searchQuery || selectedDiscipline !== 'Toutes'
                                        ? 'Aucune structure trouvée'
                                        : 'Commencez votre recherche'
                                    }
                                </Text>
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
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
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    searchbar: {
        backgroundColor: colors.surface,
        elevation: 2,
    },
    filtersContainer: {
        paddingVertical: spacing.sm,
    },
    filtersContent: {
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    filterChip: {
        backgroundColor: colors.surfaceVariant,
        marginRight: spacing.sm,
    },
    filterChipSelected: {
        backgroundColor: colors.primary,
    },
    filterChipText: {
        color: colors.text,
    },
    filterChipTextSelected: {
        color: colors.textOnPrimary,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: spacing.md,
        color: colors.textSecondary,
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: spacing.xl,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: spacing.xl * 2,
    },
    emptyText: {
        color: colors.textSecondary,
        textAlign: 'center',
    },
});
