import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '@/config/theme';

interface EmptyStateProps {
    icon?: string;
    title: string;
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = 'magnify',
    title,
    message
}) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons
                name={icon as any}
                size={64}
                color={colors.textTertiary}
            />
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xxl,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginTop: spacing.lg,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
});

export default EmptyState;
