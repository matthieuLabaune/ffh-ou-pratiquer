import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import {
    Text,
    FAB,
    SegmentedButtons,
    Chip,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Structure } from '@/models';
import { useFavoritesStore } from '@/store/favoritesStore';
import { StructureCard } from '@/components/common/StructureCardNew';
import { EmptyState } from '@/components/common';
import { colors, spacing } from '@/config/theme';
import { MainTabParamList, RootStackParamList } from '@/navigation/types';

type ViewMode = 'all' | 'byDiscipline';

type FavoritesScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Favorites'>,
    NativeStackNavigationProp<RootStackParamList>
>;

const DISCIPLINES_FILTER = [
    'Toutes',
    'Basketball',
    'Natation',
    'Tennis',
    'Handball',
    'Athlétisme',
];

export default function FavoritesScreenNew() {
    const navigation = useNavigation<FavoritesScreenNavigationProp>();
    const {
        favorites,
        removeFavorite,
        getFavoritesByDiscipline,
    } = useFavoritesStore();

    const [viewMode, setViewMode] = useState<ViewMode>('all');
    const [selectedDiscipline, setSelectedDiscipline] = useState('Toutes');
    const [filteredFavorites, setFilteredFavorites] = useState<Structure[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const updateFilteredFavorites = () => {
        let result = [...favorites];
        if (viewMode === 'byDiscipline' && selectedDiscipline !== 'Toutes') {
            result = getFavoritesByDiscipline(selectedDiscipline);
        }
        setFilteredFavorites(result);
    };

    useEffect(() => {
        updateFilteredFavorites();
    }, [favorites, selectedDiscipline, viewMode]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setTimeout(() => {
            updateFilteredFavorites();
            setIsRefreshing(false);
        }, 500);
    };

    const handleStructurePress = (structure: Structure, index: number) => {
        // Navigate to root stack screen from nested tab navigator
        // Passer la structure complète ET le tableau pour le swipe
        const parent = navigation.getParent();
        if (parent) {
            parent.navigate('StructureDetails', {
                structureId: structure.id,
                structure: structure,  // Structure actuelle
                searchResults: filteredFavorites,  // Tableau complet pour swipe
                initialIndex: index  // Index de la structure cliquée
            });
        }
    };

    const handleRemoveFavorite = (structure: Structure) => {
        removeFavorite(structure.id);
    };

    const navigateToSearch = () => {
        console.log('Navigation vers recherche');
    };

    const renderStructureItem = ({ item, index }: { item: Structure; index: number }) => (
        <StructureCard
            structure={item}
            onPress={() => handleStructurePress(item, index)}
            onFavoritePress={handleRemoveFavorite}
        />
    );

    const renderEmptyState = () => {
        if (favorites.length === 0) {
            return (
                <EmptyState
                    icon="heart-outline"
                    title="Aucun favori"
                    message="Ajoutez des structures à vos favoris"
                />
            );
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text variant="headlineMedium" style={styles.title}>
                        ❤️ Mes Favoris
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        {favorites.length} structure{favorites.length > 1 ? 's' : ''} favorite{favorites.length > 1 ? 's' : ''}
                    </Text>
                </View>

                <FlatList
                    data={filteredFavorites}
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

                <FAB
                    icon="magnify"
                    style={styles.fab}
                    onPress={navigateToSearch}
                    label="Rechercher"
                />
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
    header: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.lg,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    title: {
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        color: colors.textSecondary,
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: spacing.xl * 2,
    },
    fab: {
        position: 'absolute',
        bottom: spacing.md,
        right: spacing.md,
        backgroundColor: colors.primary,
    },
});
