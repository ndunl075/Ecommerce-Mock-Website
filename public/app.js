// Global variables
let currentUser = null;
let cart = [];
let products = [];
let categories = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadProducts();
    updateCartCount();
    checkAuth();
});

// Load categories
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        categories = await response.json();
        displayCategories();
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Display categories
function displayCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    const categoryIcons = {
        'Electronics': 'fas fa-laptop',
        'Fashion': 'fas fa-tshirt',
        'Home & Kitchen': 'fas fa-home',
        'Sports & Fitness': 'fas fa-dumbbell',
        'Books': 'fas fa-book'
    };
    
    grid.innerHTML = categories.map(category => `
        <a href="/products?category=${encodeURIComponent(category.name)}" class="category-card">
            <i class="${categoryIcons[category.name] || 'fas fa-tag'}"></i>
            <h3>${category.name}</h3>
            <p>${category.count} products</p>
        </a>
    `).join('');
}

// Load products
async function loadProducts() {
    // Use hardcoded products for reliability
    products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 99.99,
            originalPrice: 149.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            category: "Electronics",
            rating: 4.5,
            reviews: 128
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 199.99,
            originalPrice: 299.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
            category: "Electronics",
            rating: 4.8,
            reviews: 89
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 79.99,
            originalPrice: 119.99,
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
            category: "Electronics",
            rating: 4.3,
            reviews: 156
        },
        {
            id: 4,
            name: "Gaming Laptop",
            price: 1299.99,
            originalPrice: 1599.99,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
            category: "Electronics",
            rating: 4.7,
            reviews: 203
        },
        {
            id: 5,
            name: "Wireless Mouse",
            price: 49.99,
            originalPrice: 79.99,
            image: "https://images.unsplash.com/photo-1527864550417-7f91c4da4f94?w=400",
            category: "Electronics",
            rating: 4.4,
            reviews: 87
        },
        {
            id: 6,
            name: "Mechanical Keyboard",
            price: 89.99,
            originalPrice: 129.99,
            image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
            category: "Electronics",
            rating: 4.6,
            reviews: 142
        }
    ];
    
    // Display only 3 featured products on homepage
    const featuredProducts = products.slice(0, 3);
    displayProducts(featuredProducts);
    console.log('Featured products loaded:', featuredProducts);
}

// Display products
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">(${product.reviews} reviews)</span>
                </div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// View product details
function viewProduct(productId) {
    window.location.href = `/product/${productId}`;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
    updateCartCount();
    
    // Show success message
    showNotification('Product added to cart!', 'success');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim()) {
        window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        updateAuthDisplay();
    }
}

// Update authentication display
function updateAuthDisplay() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn && currentUser) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
        loginBtn.href = '/profile';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Handle search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});
