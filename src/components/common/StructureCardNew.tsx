import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';

import { Structure } from '@/models';
import { colors, spacing, borderRadius, typography, shadows } from '@/config/theme';
import { DisciplineTag } from './DisciplineTag';

interface StructureCardProps {
    structure: Structure;
    onPress: (structure: Structure) => void;
    onFavoritePress?: (structure: Structure) => void;
}

export function StructureCard({ structure, onPress, onFavoritePress }: StructureCardProps) {
    return (
        <Card style={styles.card} onPress={() => onPress(structure)}>
            <Card.Content style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text variant="titleMedium" style={styles.name} numberOfLines={2}>
                            {structure.name}
                        </Text>
                        {structure.type ? (
                            <Text variant="bodySmall" style={styles.type} numberOfLines={1}>
                                {structure.type}
                            </Text>
                        ) : null}
                    </View>

                    <View style={styles.rightSection}>
                        {typeof structure.distance === 'number' && (
                            <View style={styles.distanceContainer}>
                                <Text variant="bodySmall" style={styles.distance}>
                                    {structure.distance.toFixed(1)} km
                                </Text>
                            </View>
                        )}

                        {onFavoritePress ? (
                            <IconButton
                                icon={structure.isFavorite ? 'heart' : 'heart-outline'}
                                iconColor={structure.isFavorite ? colors.error : colors.textSecondary}
                                size={20}
                                onPress={() => onFavoritePress?.(structure)}
                                style={styles.favoriteButton}
                            />
                        ) : null}
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <Text variant="bodyMedium" style={styles.address} numberOfLines={2}>
                        📍 {structure.address.city} • {structure.address.postalCode}
                    </Text>
                </View>

                <View style={styles.disciplinesContainer}>
                    {structure.disciplines.slice(0, 3).map((discipline, index) => (
                        <DisciplineTag
                            key={`${discipline.name}-${index}`}
                            discipline={discipline.name}
                            size="small"
                        />
                    ))}

                    {structure.disciplines.length > 3 && (
                        <DisciplineTag
                            discipline={`+${structure.disciplines.length - 3}`}
                            size="small"
                        />
                    )}
                </View>

                {structure.mobilities && structure.mobilities.length > 0 && (
                    <View style={styles.accessibilityRow}>
                        <Text variant="bodySmall" style={styles.accessibilityLabel}>
                            ♿️ Accessibilité adaptée
                        </Text>
                    </View>
                )}
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: spacing.lg,
        marginVertical: spacing.sm,
        borderRadius: borderRadius.medium,
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.card,
        ...shadows.none,
    },
    content: {
        padding: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    titleContainer: {
        flex: 1,
        marginRight: spacing.sm,
        gap: spacing.xs,
    },
    name: {
        ...typography.h3,
        color: colors.text,
    },
    type: {
        ...typography.overline,
        color: colors.textSecondary,
    },
    rightSection: {
        alignItems: 'flex-end',
        gap: spacing.xs,
    },
    distanceContainer: {
        backgroundColor: colors.surfaceVariant,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.round,
    },
    distance: {
        ...typography.caption,
        fontWeight: '600',
        color: colors.primary,
    },
    favoriteButton: {
        margin: 0,
        marginTop: -spacing.xs,
    },
    locationRow: {
        marginBottom: spacing.sm,
    },
    address: {
        ...typography.bodySmall,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    disciplinesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.xs,
        marginBottom: spacing.sm,
    },
    accessibilityRow: {
        marginTop: spacing.sm,
    },
    accessibilityLabel: {
        ...typography.caption,
        color: colors.success,
        fontWeight: '600',
    },
});

export default StructureCard;
