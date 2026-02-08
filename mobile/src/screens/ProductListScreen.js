import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../api/api';

const ProductListScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products'); // Ensure this matches backend route
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price * 1000);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator size="large" color="#000" style={styles.loader} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8', // Slight gray for background contrast
    },
    list: {
        padding: 15,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    item: {
        width: '48%', // Ensure 2 items fit with spacing
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    info: {
        padding: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#000',
    },
    price: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductListScreen;
