// Product Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add to Cart Handlers
    document.querySelectorAll('.product-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            
            // Get product data
            const product = {
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src,
                quantity: 1
            };

            // Save to localStorage
            saveToCart(product);
            showNotification(`${product.name} added to cart`);
        });
    });

    // Cart Notification
    function showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }

    // Save to Cart
    function saveToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.name === product.name);
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Update Cart Count
    function updateCartCount() {
        const count = JSON.parse(localStorage.getItem('cart'))?.length || 0;
        if (count > 0) {
            document.querySelector('.cart-count').textContent = count;
        }
    }
    
    // Initialize cart count
    updateCartCount();
});

// Add to Cart Button Animation
document.querySelectorAll('.product-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});