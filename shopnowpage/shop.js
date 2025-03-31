document.addEventListener('DOMContentLoaded', function() {
    // Cart Initialization
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();

    // Add to Cart Buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const product = JSON.parse(this.dataset.product);
            
            // Check if product exists in cart
            const existingProduct = cart.find(item => item.name === product.name);
            
            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 1) + 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Visual Feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            showNotification(`${product.name} added to cart`);
        });
    });

    // Cart Count Update
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        document.querySelector('.cart-count').textContent = count;
    }

    // Notification System
    function showNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
});