import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography } from '@/config/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    onSubmitEditing?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = 'Rechercher...',
    autoFocus = false,
    onSubmitEditing,
}) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name="magnify"
                size={20}
                color={colors.textSecondary}
                style={styles.icon}
            />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textTertiary}
                autoFocus={autoFocus}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={onSubmitEditing}
            />
            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
                    <MaterialCommunityIcons
                        name="close-circle"
                        size={20}
                        color={colors.textSecondary}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.round,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        marginHorizontal: spacing.lg,
        marginVertical: spacing.sm,
        minHeight: 48,
    },
    icon: {
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        ...typography.body,
        color: colors.text,
        padding: 0,
    },
    clearButton: {
        marginLeft: spacing.sm,
        padding: spacing.xs,
    },
});

export default SearchBar;
