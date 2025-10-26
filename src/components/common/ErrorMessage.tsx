import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '@/config/theme';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
    type?: 'error' | 'warning' | 'info';
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    onRetry,
    type = 'error'
}) => {
    const getIconAndColor = () => {
        switch (type) {
            case 'warning':
                return { icon: 'alert' as const, color: colors.error };
            case 'info':
                return { icon: 'information' as const, color: colors.primary };
            default:
                return { icon: 'alert-circle' as const, color: colors.error };
        }
    };

    const { icon, color } = getIconAndColor();

    return (
        <View style={[styles.container, { borderLeftColor: color }]}>
            <View style={styles.content}>
                <MaterialCommunityIcons name={icon} size={24} color={color} style={styles.icon} />
                <Text style={styles.message}>{message}</Text>
            </View>
            {onRetry && (
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryText}>Réessayer</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        borderRadius: 8,
        borderLeftWidth: 4,
        padding: spacing.lg,
        marginHorizontal: spacing.lg,
        marginVertical: spacing.sm,
        elevation: 2,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    icon: {
        marginRight: spacing.md,
    },
    message: {
        fontSize: 16,
        color: colors.text,
        flex: 1,
    },
    retryButton: {
        marginTop: spacing.md,
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    retryText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textOnPrimary,
    },
});
