import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image || 'https://via.placeholder.com/300' }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center' },
    image: { width: '100%', height: 300, borderRadius: 10, marginBottom: 20 },
    name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    price: { fontSize: 20, color: '#888', marginBottom: 10 },
    description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});

export default ProductDetailScreen;
