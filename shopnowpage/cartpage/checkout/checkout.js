document.addEventListener('DOMContentLoaded', () => {
    let cartItems = [];
    updateCartDisplay();
  
    function updateCartDisplay() {
      const cartItemsContainer = document.querySelector('.cart-items');
      const cartCount = document.querySelector('.cart-count');
      const totalPrice = document.querySelector('.total-price');
      
      cartCount.textContent = cartItems.length;
      
      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPrice.textContent = 'R0.00';
      } else {
        // Update cart display logic here
      }
    }
  });
  