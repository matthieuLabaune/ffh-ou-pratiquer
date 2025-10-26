import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '@/config/theme';

interface FiltersDialogProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: SearchFilters) => void;
    currentFilters?: SearchFilters;
}

export interface SearchFilters {
    discipline?: string;
    region?: string;
    departement?: string;
    structureType?: string;
}

// Données de référence - à remplacer par des données de l'API
const DISCIPLINES = [
    'Basketball',
    'Football',
    'Handball',
    'Hockey',
    'Natation',
    'Rugby',
    'Tennis',
    'Tennis de table',
    'Athlétisme',
    'Cyclisme',
    'Voile',
];

const REGIONS = [
    'Auvergne-Rhône-Alpes',
    'Bourgogne-Franche-Comté',
    'Bretagne',
    'Centre-Val de Loire',
    'Corse',
    'Grand Est',
    'Hauts-de-France',
    'Île-de-France',
    'Normandie',
    'Nouvelle-Aquitaine',
    'Occitanie',
    'Pays de la Loire',
    "Provence-Alpes-Côte d'Azur",
];

const STRUCTURE_TYPES = [
    'Club',
    'Association',
    'Structure publique',
    'École',
    'Centre sportif',
];

export const FiltersDialog: React.FC<FiltersDialogProps> = ({
    visible,
    onClose,
    onApply,
    currentFilters,
}) => {
    const [selectedDiscipline, setSelectedDiscipline] = useState<string | undefined>(
        currentFilters?.discipline
    );
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
        currentFilters?.region
    );
    const [selectedDepartement, setSelectedDepartement] = useState<string | undefined>(
        currentFilters?.departement
    );
    const [selectedStructureType, setSelectedStructureType] = useState<string | undefined>(
        currentFilters?.structureType
    );

    const handleReset = () => {
        setSelectedDiscipline(undefined);
        setSelectedRegion(undefined);
        setSelectedDepartement(undefined);
        setSelectedStructureType(undefined);
    };

    const handleApply = () => {
        onApply({
            discipline: selectedDiscipline,
            region: selectedRegion,
            departement: selectedDepartement,
            structureType: selectedStructureType,
        });
        onClose();
    };

    const renderFilterSection = (
        title: string,
        options: string[],
        selected: string | undefined,
        onSelect: (value: string | undefined) => void
    ) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.optionsContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.optionChip,
                            selected === option && styles.optionChipSelected,
                        ]}
                        onPress={() => onSelect(selected === option ? undefined : option)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.optionText,
                                selected === option && styles.optionTextSelected,
                            ]}
                        >
                            {option}
                        </Text>
                        {selected === option && (
                            <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={onClose}
        >
            <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onClose}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Filtres</Text>
                    <TouchableOpacity
                        onPress={handleReset}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={styles.resetButton}>Réinitialiser</Text>
                    </TouchableOpacity>
                </View>

                {/* Contenu scrollable */}
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {renderFilterSection(
                        'Discipline',
                        DISCIPLINES,
                        selectedDiscipline,
                        setSelectedDiscipline
                    )}
                    {renderFilterSection('Région', REGIONS, selectedRegion, setSelectedRegion)}
                    {/* TODO: Ajouter sélection département basé sur région */}
                    {renderFilterSection(
                        'Type de structure',
                        STRUCTURE_TYPES,
                        selectedStructureType,
                        setSelectedStructureType
                    )}
                </ScrollView>

                {/* Bouton Appliquer */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                        <Text style={styles.applyButtonText}>Appliquer les filtres</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    resetButton: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    optionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: '#FFFFFF',
        gap: spacing.xs,
    },
    optionChipSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    optionText: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
    optionTextSelected: {
        color: '#FFFFFF',
    },
    footer: {
        padding: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.separator,
        backgroundColor: '#FFFFFF',
    },
    applyButton: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: spacing.md,
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
