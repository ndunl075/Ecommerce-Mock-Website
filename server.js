const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Sample data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400"
    ],
    description: "The latest iPhone with advanced camera system and A17 Pro chip",
    longDescription: "The iPhone 15 Pro features a titanium design, advanced camera system with 48MP main camera, A17 Pro chip for incredible performance, and all-day battery life. Perfect for photography, gaming, and productivity.",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    stock: 25,
    features: [
      "A17 Pro chip with 6-core GPU",
      "48MP Main camera system",
      "Titanium design",
      "All-day battery life",
      "5G connectivity"
    ],
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Storage": "128GB, 256GB, 512GB, 1TB",
      "Camera": "48MP Main, 12MP Ultra Wide",
      "Battery": "Up to 23 hours video playback",
      "Weight": "187 grams"
    }
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"
    ],
    description: "Supercharged by the M2 chip, MacBook Air delivers exceptional performance",
    longDescription: "The MacBook Air with M2 chip delivers incredible performance in an ultraportable design. Perfect for students, professionals, and creatives who need power on the go.",
    category: "Electronics",
    brand: "Apple",
    rating: 4.9,
    reviews: 892,
    inStock: true,
    stock: 15,
    features: [
      "M2 chip with 8-core CPU",
      "13.6-inch Liquid Retina display",
      "Up to 18 hours battery life",
      "1080p FaceTime camera",
      "Magic Keyboard with Touch ID"
    ],
    specifications: {
      "Chip": "Apple M2",
      "Display": "13.6-inch Liquid Retina",
      "Storage": "256GB SSD",
      "Memory": "8GB unified memory",
      "Weight": "1.24 kg"
    }
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    price: 150,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
    ],
    description: "Visible cushioning under every step",
    longDescription: "The Nike Air Max 270 delivers visible cushioning under every step. Designed for all-day comfort with a bold look that's perfect for any outfit.",
    category: "Fashion",
    brand: "Nike",
    rating: 4.6,
    reviews: 2156,
    inStock: true,
    stock: 50,
    features: [
      "Visible Air Max unit",
      "Breathable mesh upper",
      "Rubber outsole",
      "Comfortable fit",
      "Lightweight design"
    ],
    specifications: {
      "Upper": "Mesh and synthetic",
      "Sole": "Rubber",
      "Cushioning": "Air Max",
      "Weight": "12.5 oz",
      "Sizes": "7-13"
    }
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    price: 799,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400"
    ],
    description: "AI-powered features and stunning camera capabilities",
    longDescription: "The Samsung Galaxy S24 combines AI-powered features with a stunning camera system. Experience the future of mobile technology with intelligent features and professional photography capabilities.",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.7,
    reviews: 1834,
    inStock: true,
    stock: 30,
    features: [
      "AI-powered camera",
      "6.2-inch Dynamic AMOLED",
      "Snapdragon 8 Gen 3",
      "50MP camera system",
      "5G connectivity"
    ],
    specifications: {
      "Display": "6.2-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "50MP + 12MP + 10MP",
      "Battery": "4000mAh",
      "Storage": "128GB, 256GB"
    }
  },
  {
    id: 5,
    name: "Wireless Headphones",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    ],
    description: "Premium wireless headphones with noise cancellation",
    longDescription: "Experience premium sound quality with active noise cancellation technology. Perfect for music lovers, professionals, and anyone who values audio quality.",
    category: "Electronics",
    brand: "Sony",
    rating: 4.5,
    reviews: 967,
    inStock: true,
    stock: 40,
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Quick charge",
      "Comfortable fit",
      "High-quality audio"
    ],
    specifications: {
      "Battery Life": "30 hours",
      "Charging": "USB-C",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g",
      "Frequency": "20Hz-20kHz"
    }
  },
  {
    id: 6,
    name: "KitchenAid Mixer",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
    ],
    description: "Professional-grade stand mixer for all your baking needs",
    longDescription: "The KitchenAid stand mixer is a kitchen essential for serious bakers. With multiple attachments and powerful motor, it handles everything from bread dough to whipped cream.",
    category: "Home & Kitchen",
    brand: "KitchenAid",
    rating: 4.8,
    reviews: 1456,
    inStock: true,
    stock: 20,
    features: [
      "5-quart bowl capacity",
      "10 speeds",
      "Dishwasher-safe parts",
      "Multiple attachments",
      "Powerful motor"
    ],
    specifications: {
      "Bowl Capacity": "5 quarts",
      "Speeds": "10",
      "Power": "300W",
      "Color": "Empire Red",
      "Weight": "11.5 lbs"
    }
  },
  {
    id: 7,
    name: "Yoga Mat Premium",
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"
    ],
    description: "High-quality yoga mat for comfort and stability",
    longDescription: "Enhance your yoga practice with this premium yoga mat. Made from eco-friendly materials with excellent grip and cushioning for all types of yoga.",
    category: "Sports & Fitness",
    brand: "Lululemon",
    rating: 4.4,
    reviews: 723,
    inStock: true,
    stock: 60,
    features: [
      "Non-slip surface",
      "Eco-friendly materials",
      "Easy to clean",
      "Lightweight",
      "Extra thick for comfort"
    ],
    specifications: {
      "Dimensions": "72\" x 24\"",
      "Thickness": "5mm",
      "Weight": "2.5 lbs",
      "Material": "Natural rubber",
      "Care": "Hand wash"
    }
  },
  {
    id: 8,
    name: "The Great Gatsby",
    price: 12,
    originalPrice: 15,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
    ],
    description: "A classic American novel by F. Scott Fitzgerald",
    longDescription: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel follows Nick Carraway's interactions with mysterious millionaire Jay Gatsby.",
    category: "Books",
    brand: "Scribner",
    rating: 4.6,
    reviews: 2891,
    inStock: true,
    stock: 100,
    features: [
      "Classic literature",
      "Paperback edition",
      "192 pages",
      "English language",
      "Timeless story"
    ],
    specifications: {
      "Pages": "192",
      "Language": "English",
      "Format": "Paperback",
      "Publisher": "Scribner",
      "ISBN": "978-0-7432-7356-5"
    }
  }
];

const categories = [
  { name: "Electronics", count: 4 },
  { name: "Fashion", count: 1 },
  { name: "Home & Kitchen", count: 1 },
  { name: "Sports & Fitness", count: 1 },
  { name: "Books", count: 1 }
];

// In-memory storage (in a real app, use a database)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', createdAt: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123', createdAt: new Date() }
];
let orders = [];
let cart = {};

// API Routes
app.get('/api/products', (req, res) => {
  const { category, search, sort, page = 1, limit = 8 } = req.query;
  let filteredProducts = [...products];

  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  // Search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  if (sort) {
    switch (sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
    }
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page: parseInt(page),
    totalPages: Math.ceil(filteredProducts.length / limit)
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// User authentication (simplified)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const user = { id: users.length + 1, name, email, password, createdAt: new Date() };
  users.push(user);
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token: 'fake-jwt-token' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Cart management
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  res.json(cart[userId] || []);
});

app.post('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!cart[userId]) cart[userId] = [];
  
  const existingItem = cart[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart[userId].push({ productId, quantity, product });
  }
  
  res.json(cart[userId]);
});

app.delete('/api/cart/:userId/:productId', (req, res) => {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);
  
  if (cart[userId]) {
    cart[userId] = cart[userId].filter(item => item.productId !== productId);
  }
  
  res.json(cart[userId] || []);
});

// Orders
app.post('/api/orders', (req, res) => {
  const { userId, items, total, shippingAddress } = req.body;
  const order = {
    id: orders.length + 1,
    userId,
    items,
    total,
    shippingAddress,
    status: 'pending',
    createdAt: new Date()
  };
  orders.push(order);
  
  // Clear cart
  cart[userId] = [];
  
  res.json(order);
});

app.get('/api/orders/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userOrders = orders.filter(order => order.userId === userId);
  res.json(userOrders);
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'categories.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/product/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Enhanced Ecommerce server running on http://localhost:${PORT}`);
  console.log(`📱 Open your browser and go to: http://localhost:${PORT}`);
  console.log(`🛍️  Features: Multiple pages, user auth, detailed products, cart, orders!`);
});