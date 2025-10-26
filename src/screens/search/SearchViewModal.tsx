import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Animated,
    Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing } from '@/config/theme';

interface SearchViewModalProps {
    visible: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
    initialQuery?: string;
}

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_RECENT_SEARCHES = 5;

export const SearchViewModal: React.FC<SearchViewModalProps> = ({
    visible,
    onClose,
    onSearch,
    initialQuery = '',
}) => {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const slideAnim = useRef(new Animated.Value(-100)).current;
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (visible) {
            loadRecentSearches();
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
            // Focus automatique sur le champ
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            Animated.timing(slideAnim, {
                toValue: -100,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const loadRecentSearches = async () => {
        try {
            const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
            if (stored) {
                setRecentSearches(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Erreur chargement recherches récentes:', error);
        }
    };

    const saveRecentSearch = async (query: string) => {
        try {
            const trimmed = query.trim();
            if (!trimmed) return;

            let updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)];
            updated = updated.slice(0, MAX_RECENT_SEARCHES);

            await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
            setRecentSearches(updated);
        } catch (error) {
            console.error('Erreur sauvegarde recherche récente:', error);
        }
    };

    const removeRecentSearch = async (query: string) => {
        try {
            const updated = recentSearches.filter(s => s !== query);
            await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
            setRecentSearches(updated);
        } catch (error) {
            console.error('Erreur suppression recherche récente:', error);
        }
    };

    const handleSearch = (query: string) => {
        const trimmed = query.trim();
        if (trimmed) {
            saveRecentSearch(trimmed);
            onSearch(trimmed);
            onClose();
        }
    };

    const handleChangeText = (text: string) => {
        setSearchQuery(text);

        // TODO: Implémenter suggestions de villes depuis API
        // if (text.length > 2) {
        //     fetchCitySuggestions(text);
        // } else {
        //     setCitySuggestions([]);
        // }
    };

    const renderRecentSearchItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleSearch(item)}
            activeOpacity={0.7}
        >
            <MaterialCommunityIcons name="history" size={20} color={colors.textTertiary} />
            <Text style={styles.listItemText}>{item}</Text>
            <TouchableOpacity
                onPress={() => removeRecentSearch(item)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <MaterialCommunityIcons name="close" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderCitySuggestion = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleSearch(item)}
            activeOpacity={0.7}
        >
            <MaterialCommunityIcons name="map-marker" size={20} color={colors.primary} />
            <Text style={styles.listItemText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={false}
            onRequestClose={onClose}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            {
                                translateY: slideAnim.interpolate({
                                    inputRange: [-100, 0],
                                    outputRange: [-100, 0],
                                }),
                            },
                        ],
                        opacity: slideAnim.interpolate({
                            inputRange: [-100, 0],
                            outputRange: [0, 1],
                        }),
                    },
                ]}
            >
                <SafeAreaView edges={['top']} style={styles.safeArea}>
                    {/* Header avec recherche */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.backButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} />
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            <TextInput
                                ref={inputRef}
                                style={styles.input}
                                value={searchQuery}
                                onChangeText={handleChangeText}
                                onSubmitEditing={() => handleSearch(searchQuery)}
                                placeholder="Rechercher un club ou une ville..."
                                placeholderTextColor={colors.textTertiary}
                                returnKeyType="search"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery('')}>
                                    <MaterialCommunityIcons name="close" size={20} color={colors.textSecondary} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Contenu */}
                    <View style={styles.content}>
                        {citySuggestions.length > 0 ? (
                            <FlatList
                                data={citySuggestions}
                                renderItem={renderCitySuggestion}
                                keyExtractor={(item, index) => `city-${index}`}
                                keyboardShouldPersistTaps="handled"
                            />
                        ) : (
                            <>
                                {recentSearches.length > 0 && (
                                    <>
                                        <Text style={styles.sectionTitle}>Recherches récentes</Text>
                                        <FlatList
                                            data={recentSearches}
                                            renderItem={renderRecentSearchItem}
                                            keyExtractor={(item, index) => `recent-${index}`}
                                            keyboardShouldPersistTaps="handled"
                                        />
                                    </>
                                )}
                                {recentSearches.length === 0 && (
                                    <View style={styles.emptyState}>
                                        <MaterialCommunityIcons
                                            name="magnify"
                                            size={64}
                                            color={colors.surfaceVariant}
                                        />
                                        <Text style={styles.emptyStateText}>
                                            Aucune recherche récente
                                        </Text>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </SafeAreaView>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.separator,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        marginRight: spacing.sm,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
        paddingVertical: spacing.sm,
    },
    content: {
        flex: 1,
        paddingTop: spacing.md,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    listItemText: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    emptyStateText: {
        fontSize: 16,
        color: colors.textTertiary,
        marginTop: spacing.md,
        textAlign: 'center',
    },
});
