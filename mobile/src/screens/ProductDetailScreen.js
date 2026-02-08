import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price * 1000);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={{ uri: product.image || 'https://via.placeholder.com/300' }} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{formatCurrency(product.price)}</Text>
                    <Text style={styles.descriptionHeader}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Back to Products</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContent: {
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'cover'
    },
    details: {
        padding: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    price: {
        fontSize: 24,
        color: '#666',
        marginBottom: 20,
        fontWeight: '500',
    },
    descriptionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#444',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        background: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    backButton: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ProductDetailScreen;
