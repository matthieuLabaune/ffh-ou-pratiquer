import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    FlatList,
    useWindowDimensions,
    ViewToken,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '@/config/theme';
import { RootStackParamList } from '@/navigation/types';
import { Structure } from '@/models';
import { structuresService } from '@/api';
import { DisciplineTag, LoadingSpinner } from '@/components/common';

type StructureDetailScreenRouteProp = RouteProp<RootStackParamList, 'StructureDetails'>;
type StructureDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StructureDetails'>;

export default function StructureDetailScreen() {
    const route = useRoute<StructureDetailScreenRouteProp>();
    const navigation = useNavigation<StructureDetailScreenNavigationProp>();
    const { width: screenWidth } = useWindowDimensions();
    const flatListRef = useRef<FlatList>(null);

    const {
        structureId,
        structure: passedStructure,
        searchResults,
        initialIndex = 0
    } = route.params;

    // Si on a searchResults, on utilise le mode swipe, sinon mode simple
    const structures = searchResults || (passedStructure ? [passedStructure] : []);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLoading, setIsLoading] = useState(!passedStructure && !searchResults);
    const [isFavorite, setIsFavorite] = useState(false);

    const currentStructure = structures[currentIndex];

    useEffect(() => {
        // Charger uniquement si on n'a pas reçu la structure en paramètre
        if (!passedStructure && !searchResults) {
            loadStructure();
        } else if (currentStructure) {
            setIsFavorite(currentStructure.isFavorite || false);
        }
    }, [structureId, passedStructure, searchResults, currentIndex]);

    const loadStructure = async () => {
        try {
            setIsLoading(true);
            const data = await structuresService.getById(structureId);
            // Fallback pour mode sans swipe
            if (!searchResults) {
                structures[0] = data;
            }
            setIsFavorite(data.isFavorite || false);
        } catch (error) {
            console.error('Erreur chargement structure:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems.length > 0 && viewableItems[0].index !== null) {
            setCurrentIndex(viewableItems[0].index);
        }
    }, []);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // TODO: Appel API pour sauvegarder le favori
    };

    const handleCall = (phone: string) => {
        Linking.openURL(`tel:${phone}`);
    };

    const handleEmail = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    const handleWebsite = (website: string) => {
        const url = website.startsWith('http') ? website : `https://${website}`;
        Linking.openURL(url);
    };

    const handleDirections = () => {
        if (currentStructure?.address.latitude && currentStructure?.address.longitude) {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${currentStructure.address.latitude},${currentStructure.address.longitude}`;
            Linking.openURL(url);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <LoadingSpinner />
            </SafeAreaView>
        );
    }

    if (!currentStructure) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Structure non trouvée</Text>
            </SafeAreaView>
        );
    }

    // Composant de rendu pour une structure
    const renderStructureDetail = ({ item: structure }: { item: Structure }) => (
        <View style={{ width: screenWidth }}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Informations principales */}
                <View style={styles.mainInfo}>
                    <Text style={styles.structureName}>{structure.name}</Text>

                    {/* Tags région/département */}
                    <View style={styles.tagsRow}>
                        {structure.region && (
                            <View style={[styles.metadataTag, styles.regionTag]}>
                                <Text style={styles.metadataTagText}>{structure.region}</Text>
                            </View>
                        )}
                        {structure.departement && (
                            <View style={[styles.metadataTag, styles.departementTag]}>
                                <Text style={styles.metadataTagText}>{structure.departement}</Text>
                            </View>
                        )}
                        {structure.type && (
                            <View style={[styles.metadataTag, styles.typeTag]}>
                                <Text style={styles.metadataTagText}>{structure.type}</Text>
                            </View>
                        )}
                    </View>

                    {/* Adresse */}
                    <View style={styles.addressSection}>
                        <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} />
                        <View style={styles.addressText}>
                            <Text style={styles.address}>
                                {structure.address.street && `${structure.address.street}, `}
                                {structure.address.city}
                            </Text>
                            {structure.address.postalCode && (
                                <Text style={styles.postalCode}>{structure.address.postalCode}</Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Boutons d'action */}
                {structure.contact && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Contact</Text>
                        {structure.contact.phone && (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleCall(structure.contact.phone!)}
                            >
                                <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
                                <Text style={styles.actionButtonText}>{structure.contact.phone}</Text>
                                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
                            </TouchableOpacity>
                        )}
                        {structure.contact.email && (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleEmail(structure.contact.email!)}
                            >
                                <MaterialCommunityIcons name="email" size={20} color={colors.primary} />
                                <Text style={styles.actionButtonText}>{structure.contact.email}</Text>
                                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
                            </TouchableOpacity>
                        )}
                        {structure.contact.website && (
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleWebsite(structure.contact.website!)}
                            >
                                <MaterialCommunityIcons name="web" size={20} color={colors.primary} />
                                <Text style={styles.actionButtonText}>Site web</Text>
                                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                {/* Disciplines */}
                {structure.disciplines && structure.disciplines.length > 0 && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Disciplines</Text>
                        <View style={styles.disciplinesContainer}>
                            {structure.disciplines.map((discipline) => (
                                <DisciplineTag key={discipline.id} discipline={discipline.name} />
                            ))}
                        </View>
                    </View>
                )}

                {/* Accessibilité */}
                {structure.mobilities && structure.mobilities.length > 0 && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Accessibilité</Text>
                        {structure.mobilities.map((mobility) => (
                            <View key={mobility.id} style={styles.mobilityItem}>
                                <MaterialCommunityIcons name="check-circle" size={20} color={colors.success} />
                                <Text style={styles.mobilityText}>{mobility.name}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Bouton Itinéraire */}
                {structure.address.latitude && structure.address.longitude && (
                    <TouchableOpacity style={styles.directionsButton} onPress={handleDirections}>
                        <MaterialCommunityIcons name="directions" size={20} color="#FFFFFF" />
                        <Text style={styles.directionsButtonText}>Obtenir l'itinéraire</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.headerLogo}>
                        <MaterialCommunityIcons name="wheelchair" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.titleHandi}>HANDI</Text>
                        <Text style={styles.titleGo}>GO</Text>
                    </View>
                    <View style={styles.headerRightButtons}>
                        {/* Indicateur de page si multiple structures */}
                        {structures.length > 1 && (
                            <Text style={styles.pageIndicator}>
                                {currentIndex + 1}/{structures.length}
                            </Text>
                        )}
                        <TouchableOpacity onPress={toggleFavorite} style={styles.headerButton}>
                            <MaterialCommunityIcons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={24}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Contenu avec swipe si plusieurs structures */}
            <FlatList
                ref={flatListRef}
                data={structures}
                renderItem={renderStructureDetail}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={initialIndex}
                getItemLayout={(data, index) => ({
                    length: screenWidth,
                    offset: screenWidth * index,
                    index,
                })}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primary,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    headerButton: {
        padding: spacing.xs,
    },
    headerLogo: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: spacing.xs,
    },
    titleHandi: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    titleGo: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.accent,
        letterSpacing: 1,
    },
    content: {
        flex: 1,
    },
    mainInfo: {
        padding: spacing.lg,
        backgroundColor: '#FFFFFF',
    },
    structureName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.md,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    metadataTag: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 12,
    },
    regionTag: {
        backgroundColor: colors.regionTag,
    },
    departementTag: {
        backgroundColor: colors.departementTag,
    },
    typeTag: {
        backgroundColor: colors.textSecondary,
    },
    metadataTagText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    addressSection: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    addressText: {
        flex: 1,
    },
    address: {
        fontSize: 16,
        color: colors.text,
        lineHeight: 22,
    },
    postalCode: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 2,
    },
    card: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: spacing.lg,
        marginTop: spacing.md,
        padding: spacing.md,
        borderRadius: borderRadius.medium,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.md,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    actionButtonText: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    disciplinesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    mobilityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.xs,
        gap: spacing.sm,
    },
    mobilityText: {
        fontSize: 16,
        color: colors.text,
    },
    directionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        marginHorizontal: spacing.lg,
        marginTop: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.medium,
        gap: spacing.sm,
    },
    directionsButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    bottomSpacing: {
        height: spacing.xl * 2,
    },
    headerRightButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    pageIndicator: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
