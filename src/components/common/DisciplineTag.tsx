import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/config/theme';

interface DisciplineTagProps {
    discipline: string;
    size?: 'small' | 'medium';
}

export const DisciplineTag: React.FC<DisciplineTagProps> = ({
    discipline,
    size = 'medium'
}) => {
    return (
        <View style={[styles.container, size === 'small' && styles.small]}>
            <Text
                style={[styles.text, size === 'small' && styles.textSmall]}
                numberOfLines={1}
            >
                {discipline}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: colors.disciplineTagBg,
        borderWidth: 1,
        borderColor: colors.disciplineTagBorder,
        minHeight: 26,
        justifyContent: 'center',
    },
    small: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        minHeight: 22,
    },
    text: {
        fontSize: 13,
        color: colors.disciplineTagText,
        fontWeight: '500',
    },
    textSmall: {
        fontSize: 11,
    },
});

export default DisciplineTag;
