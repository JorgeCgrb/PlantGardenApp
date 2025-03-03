import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { getPlantImage } from '../../utils/assetUtils';

const PlantInGarden = ({ plant, variety }) => {
    return (
        <View style={styles.container}>
            <Image
                source={getPlantImage(plant.name.toLowerCase())}
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