import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const { addToCart } = useCart();

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price * 1000);
    };

    const handleAddToCart = () => {
        addToCart(product);
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
                <TouchableOpacity style={[styles.btn, styles.backButton]} onPress={() => navigation.goBack()}>
                    <Text style={[styles.btnText, styles.backBtnText]}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.cartButton]} onPress={handleAddToCart}>
                    <Text style={styles.btnText}>Add to Cart</Text>
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
        flexDirection: 'row',
        gap: 10,
    },
    btn: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
    },
    cartButton: {
        backgroundColor: '#000',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backBtnText: {
        color: '#000',
    }
});

export default ProductDetailScreen;
