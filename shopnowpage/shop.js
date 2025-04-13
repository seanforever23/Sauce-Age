document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = Array.from(document.querySelectorAll('.product-card'));
    const modal = document.querySelector('.product-modal');
    const modalContent = document.querySelector('.product-slider');
    let currentProductIndex = 0;

    // Cart Count Update
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        document.querySelector('.cart-count').textContent = count;
    }
    updateCartCount();

    // Add to Cart
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const product = JSON.parse(this.closest('.product-card').dataset.product);
            
            const existing = cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            animateCart();
        });
    });

    // Product Viewer
    products.forEach((product, index) => {
        product.querySelector('.view-btn').addEventListener('click', () => {
            currentProductIndex = index;
            showProductModal(index);
        });
    });

    // Modal Navigation
    document.querySelector('.next').addEventListener('click', () => {
        currentProductIndex = (currentProductIndex + 1) % products.length;
        showProductModal(currentProductIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
        showProductModal(currentProductIndex);
    });

    document.querySelector('.close-btn').addEventListener('click', hideProductModal);

    // Modal Content
    function showProductModal(index) {
        const product = products[index];
        const data = JSON.parse(product.dataset.product);
        
        modalContent.innerHTML = `
            <div class="slide" data-index="${index}">
                <img src="${data.image}" alt="${data.name}">
                <div class="details">
                    <h2>${data.name}</h2>
                    <p class="price">$${data.price}</p>
                    <p class="description">${data.description}</p>
                    <button class="add-to-cart-modal">Add to Cart</button>
                </div>
            </div>
            <button class="prev">&#10094;</button>
            <button class="next">&#10095;</button>
            <span class="close-btn">&times;</span>
        `;
        
        modal.style.display = 'block';
        document.querySelector('.add-to-cart-modal').addEventListener('click', () => {
            const existing = cart.find(item => item.id === data.id);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({...data, quantity: 1});
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            animateCart();
        });
    }

    function hideProductModal() {
        modal.style.display = 'none';
    }

    // Cart Animation
    function animateCart() {
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => cartIcon.style.transform = '', 200);
    }
});