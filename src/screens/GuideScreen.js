import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from '../utils/i18n';

const GuideScreen = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{t('guide')}</Text>
        <Text style={styles.subtitle}>Garden Planner App</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Square Foot Gardening</Text>
          <Text style={styles.paragraph}>
            Square foot gardening is a simple, efficient method of creating small,
            orderly, and productive vegetable gardens. Each square foot of the garden
            is planted with a different crop, with the number of plants per square
            determined by the size of the plant.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use This App</Text>
          <Text style={styles.paragraph}>
            • Create garden layouts with customizable grids{'\n'}
            • Browse plants and their growing information{'\n'}
            • Track planting and harvesting schedules{'\n'}
            • View growing calendars for each plant
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.paragraph}>
            Begin by creating a garden in the Gardens tab. Then, add plants to
            your garden by selecting a cell and choosing from our plant database.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: '#AAA',
  }
});

export default GuideScreen;