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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: { padding: 10 },
    item: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        elevation: 2,
    },
    image: { width: 80, height: 80, borderRadius: 5 },
    info: { marginLeft: 10, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: '#888' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductListScreen;
