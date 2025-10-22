// Shared products data for all pages
const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        originalPrice: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        category: "Electronics",
        rating: 4.5,
        reviews: 128,
        description: "Premium wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        originalPrice: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        category: "Electronics",
        rating: 4.8,
        reviews: 89,
        description: "Advanced smartwatch with health monitoring"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        category: "Electronics",
        rating: 4.3,
        reviews: 156,
        description: "Portable Bluetooth speaker with excellent sound quality"
    },
    {
        id: 4,
        name: "Gaming Laptop",
        price: 1299.99,
        originalPrice: 1599.99,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        category: "Electronics",
        rating: 4.7,
        reviews: 203,
        description: "High-performance gaming laptop with RTX graphics"
    },
    {
        id: 5,
        name: "Wireless Mouse",
        price: 49.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1527864550417-7f91c4da4f94?w=400",
        category: "Electronics",
        rating: 4.4,
        reviews: 87,
        description: "Ergonomic wireless mouse with precision tracking"
    },
    {
        id: 6,
        name: "Mechanical Keyboard",
        price: 89.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        category: "Electronics",
        rating: 4.6,
        reviews: 142,
        description: "RGB mechanical keyboard with tactile switches"
    }
];

// Function to get products
function getProducts() {
    return PRODUCTS_DATA;
}

// Function to get product by ID
function getProductById(id) {
    return PRODUCTS_DATA.find(product => product.id === parseInt(id));
}
