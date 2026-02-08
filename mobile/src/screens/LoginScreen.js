import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import api from '../api/api';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token } = response.data;
            await SecureStore.setItemAsync('userToken', token);
            navigation.replace('ProductList');
        } catch (error) {
            Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>OurMarket</Text>
                <Text style={styles.subtitle}>Welcome back</Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerLink}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.registerLinkText}>Don't have an account? <Text style={{ fontWeight: 'bold' }}>Register</Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        padding: 15,
        marginBottom: 15,
        borderRadius: 12,
        fontSize: 16,
        color: '#000',
    },
    loginButton: {
        backgroundColor: '#000',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerLinkText: {
        color: '#666',
        fontSize: 14,
    }
});

export default LoginScreen;
