import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGardensViewModel } from '../viewmodels/GardensViewModel';
import { useTranslation } from 'react-i18next';
import Garden from '../models/Garden';

const NewGardenScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { addGarden } = useGardensViewModel();
    const [name, setName] = useState('');
    const [rows, setRows] = useState('3');
    const [columns, setColumns] = useState('24');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle garden creation
    const handleCreateGarden = async () => {
        // Validate inputs
        if (!name.trim()) {
            Alert.alert(t('error'), t('name_required'));
            return;
        }

        const rowsNum = parseInt(rows, 10);
        const columnsNum = parseInt(columns, 10);

        if (isNaN(rowsNum) || rowsNum <= 0 || isNaN(columnsNum) || columnsNum <= 0) {
            Alert.alert(t('error'), t('invalid_dimensions'));
            return;
        }

        setIsSubmitting(true);

        try {
            // Create new garden
            const newGarden = new Garden(
                Date.now().toString(), // Simple ID generation
                name.trim(),
                rowsNum,
                columnsNum,
                [] // Empty plants array
            );

            // Add to storage
            await addGarden(newGarden);

            // Navigate back to gardens list
            navigation.goBack();
        } catch (error) {
            console.error('Error creating garden:', error);
            Alert.alert(t('error'), t('garden_creation_failed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{t('new_garden')}</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('garden_name')}</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder={t('enter_garden_name')}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.dimensionsContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('rows')}</Text>
                        <TextInput
                            style={styles.input}
                            value={rows}
                            onChangeText={setRows}
                            keyboardType="numeric"
                            placeholder="3"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('columns')}</Text>
                        <TextInput
                            style={styles.input}
                            value={columns}
                            onChangeText={setColumns}
                            keyboardType="numeric"
                            placeholder="24"
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>

                <Text style={styles.description}>
                    {t('garden_size_description')}
                </Text>

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreateGarden}
                    disabled={isSubmitting}
                >
                    <Text style={styles.createButtonText}>
                        {isSubmitting ? t('creating') : t('create_garden')}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    placeholder: {
        width: 40,
    },
    form: {
        padding: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#333',
        color: 'white',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    dimensionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        color: '#AAA',
        marginBottom: 24,
        lineHeight: 20,
    },
    createButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NewGardenScreen;