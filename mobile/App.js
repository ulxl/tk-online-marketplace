import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CartScreen from './src/screens/CartScreen';
import { CartProvider, useCart } from './src/context/CartContext';

const Stack = createNativeStackNavigator();

const CartIcon = () => {
  const navigation = useNavigation();
  const { cart } = useCart();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartBtn}>
      <Text style={styles.cartText}>Cart ({cart.length})</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#000',
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: '#fff' }
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{
              title: 'OurMarket',
              headerBackVisible: false,
              headerRight: () => <CartIcon />
            }}
          />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details', headerRight: () => <CartIcon /> }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'My Cart' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  cartBtn: {
    marginRight: 10,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  }
});
