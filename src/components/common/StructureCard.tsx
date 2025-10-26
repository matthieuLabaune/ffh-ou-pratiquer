import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DisciplineTag } from './DisciplineTag';
import { Structure } from '@/models';
import { colors, spacing } from '@/config/theme';

interface StructureCardProps {
    structure: Structure;
    onPress: (structure: Structure) => void;
}

export const StructureCard: React.FC<StructureCardProps> = ({ structure, onPress }) => {
    const displayedDisciplines = structure.disciplines.slice(0, 8);
    const remainingCount = structure.disciplines.length - 8;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(structure)}
            activeOpacity={0.7}
        >
            {/* Tags région/département */}
            {(structure.region || structure.departement) && (
                <View style={styles.tagsRow}>
                    {structure.region && (
                        <View style={[styles.tag, styles.regionTag]}>
                            <Text style={styles.tagText}>{structure.region}</Text>
                        </View>
                    )}
                    {structure.departement && (
                        <View style={[styles.tag, styles.departementTag]}>
                            <Text style={styles.tagText}>{structure.departement}</Text>
                        </View>
                    )}
                </View>
            )}

            {/* Nom de la structure */}
            <Text style={styles.title}>{structure.name}</Text>

            {/* Adresse */}
            <Text style={styles.address}>
                {structure.address.street && `${structure.address.street}, `}
                {structure.address.city}
            </Text>

            {/* Disciplines */}
            {structure.disciplines.length > 0 && (
                <View style={styles.disciplinesContainer}>
                    {displayedDisciplines.map((discipline) => (
                        <DisciplineTag key={discipline.id} discipline={discipline.name} />
                    ))}
                    {remainingCount > 0 && (
                        <DisciplineTag
                            discipline={`+ ${remainingCount} autre${remainingCount > 1 ? 's' : ''}`}
                        />
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: colors.cardBorder,
        marginHorizontal: spacing.lg,
        marginVertical: spacing.sm,
        padding: spacing.md,
    },
    tagsRow: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
        gap: spacing.sm,
    },
    tag: {
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
    tagText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    address: {
        fontSize: 14,
        color: colors.textSecondary,
        lineHeight: 20,
        marginBottom: spacing.md,
    },
    disciplinesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
});
