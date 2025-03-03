import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from '../../utils/i18n';

const PlantCategories = ({ categories, selectedCategory, onCategorySelect }) => {
    const { t } = useTranslation();

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <TouchableOpacity
                style={[
                    styles.categoryItem,
                    !selectedCategory && styles.selectedCategory
                ]}
                onPress={() => onCategorySelect(null)}
            >
                <Text style={styles.categoryText}>All</Text>
            </TouchableOpacity>

            {categories.map((category) => (
                <TouchableOpacity
                    key={category}
                    style={[
                        styles.categoryItem,
                        selectedCategory === category && styles.selectedCategory
                    ]}
                    onPress={() => onCategorySelect(category)}
                >
                    <Text style={styles.categoryText}>{t(category)}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 50,
        marginBottom: 8,
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    categoryItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        backgroundColor: '#333',
        borderRadius: 20,
    },
    selectedCategory: {
        backgroundColor: '#4CAF50',
    },
    categoryText: {
        color: 'white',
        fontWeight: '500',
    },
});

export default PlantCategories;