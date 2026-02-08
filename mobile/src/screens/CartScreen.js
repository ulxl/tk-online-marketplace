import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
    const { cart, removeFromCart, clearCart } = useCart();

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price * 1000);
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => {
        Alert.alert(
            'Checkout',
            `Total: ${formatCurrency(total)}\nProceed to payment?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        clearCart();
                        Alert.alert('Success', 'Order placed successfully!');
                        navigation.navigate('ProductList');
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item._id)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );

    if (cart.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('ProductList')}>
                    <Text style={styles.shopButtonText}>Start Shopping</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    list: { padding: 20 },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    image: { width: 70, height: 70, borderRadius: 8 },
    info: { flex: 1, marginLeft: 15 },
    name: { fontSize: 16, fontWeight: 'bold' },
    price: { fontSize: 14, color: '#666', marginTop: 4 },
    removeButton: {
        padding: 8,
    },
    removeText: { color: '#ff4444', fontSize: 12, fontWeight: 'bold' },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalValue: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    checkoutButton: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    shopButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    shopButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default CartScreen;
