require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 99.99,
        image: 'https://picsum.photos/seed/headphones/400/400',
        category: 'Electronics'
    },
    {
        name: 'Smart Watch',
        description: 'Track your fitness and notifications on the go.',
        price: 149.50,
        image: 'https://picsum.photos/seed/watch/400/400',
        category: 'Electronics'
    },
    {
        name: 'Running Shoes',
        description: 'Comfortable shoes for long-distance running.',
        price: 75.00,
        image: 'https://picsum.photos/seed/shoes/400/400',
        category: 'Fashion'
    },
    {
        name: 'Leather Jacket',
        description: 'Stylish genuine leather jacket.',
        price: 199.99,
        image: 'https://picsum.photos/seed/jacket/400/400',
        category: 'Fashion'
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/online-store')
    .then(async () => {
        console.log('MongoDB Connected');
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Database seeded!');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
