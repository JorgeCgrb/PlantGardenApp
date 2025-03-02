import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const PlantInGarden = ({ plant, variety }) => {
    // Get image source based on plant type
    const getPlantImage = () => {
        // This is a simplified example - in a real app, you'd use proper asset handling
        switch (plant.name.toLowerCase()) {
            case 'garlic':
                return require('../../assets/images/plants/alliums/garlic.png');
            case 'onions':
                return require('../../assets/images/plants/alliums/onions.png');
            case 'cucumber':
                return require('../../assets/images/plants/other_vegetables/cucumber.png');
            case 'pumpkin':
                return require('../../assets/images/plants/other_vegetables/pumpkin.png');
            case 'tomato':
                return require('../../assets/images/plants/other_vegetables/tomato.png');
            default:
                return require('../../assets/images/plants/alliums/garlic.png');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={getPlantImage()}
                style={styles.plantImage}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plantImage: {
        width: 32,
        height: 32,
    },
});

export default PlantInGarden;