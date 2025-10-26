import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { colors, spacing } from '@/config/theme';

interface LoadingSpinnerProps {
    text?: string;
    size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    text = 'Chargement...',
    size = 'large'
}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={colors.primary} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    text: {
        fontSize: 16,
        color: colors.textSecondary,
        marginTop: spacing.md,
        textAlign: 'center',
    },
});

export default LoadingSpinner;
