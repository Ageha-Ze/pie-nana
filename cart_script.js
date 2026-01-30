// Pie Nana Shopping Cart System
// Simplified dan tested

const WA_NUMBER = "628993071991";

let cart = [];
let currentModalItemId = null;

// Format Rupiah
const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
}).format(number);

// Open Modal
function openQuantityModal(itemId) {
    console.log('Modal opened for item:', itemId);
    currentModalItemId = itemId;
    
    const modalQuantityInput = document.getElementById('modal-quantity');
    if (modalQuantityInput) {
        modalQuantityInput.value = 1;
    }
    
    const quantityModal = document.getElementById('quantity-modal');
    if (quantityModal) {
        quantityModal.classList.add('flex');
        quantityModal.classList.remove('hidden');
    }
}

// Close Modal
function closeQuantityModal() {
    const quantityModal = document.getElementById('quantity-modal');
    if (quantityModal) {
        quantityModal.classList.remove('flex');
        quantityModal.classList.add('hidden');
    }
    currentModalItemId = null;
}

// Confirm Add to Cart
function confirmAddToCart() {
    const modalQuantityInput = document.getElementById('modal-quantity');
    const quantity = parseInt(modalQuantityInput.value, 10);
    
    if (currentModalItemId !== null && quantity > 0) {
        addToCart(currentModalItemId, quantity);
    }
    closeQuantityModal();
}

// Add to Cart
function addToCart(itemId, quantity) {
    // Product data hardcoded
    const products = {
        1: { id: 1, name: 'Pie Brownies Topping Kacang', price: 4000 },
        2: { id: 2, name: 'Pie Brownies Topping Choco Chips', price: 3500 },
        3: { id: 3, name: 'Pie Brownies Topping Kacang Almond', price: 4000 }
    };
    
    const item = products[itemId];
    if (!item) return;
    
    const cartItem = cart.find(c => c.id === itemId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ 
            id: item.id, 
            name: item.name, 
            price: item.price, 
            quantity: quantity 
        });
    }
    
    updateCartDisplay();
    
    // Scroll to cart
    setTimeout(() => {
        const cartSection = document.getElementById('cart-checkout-section');
        if (cartSection) {
            cartSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 200);
}

// Change Quantity
function changeQuantity(itemId, change) {
    const cartIndex = cart.findIndex(c => c.id === itemId);
    if (cartIndex > -1) {
        cart[cartIndex].quantity += change;
        if (cart[cartIndex].quantity <= 0) {
            cart.splice(cartIndex, 1);
        }
        updateCartDisplay();
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartCountDisplay = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;
    
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            totalItems += item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between border-b pb-2';
            itemElement.innerHTML = `
                <div class="flex-grow pr-2">
                    <p class="font-semibold text-sm">${item.name}</p>
                    <p class="text-xs text-gray-500">${formatRupiah(item.price)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="changeQuantity(${item.id}, -1)" class="w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs flex items-center justify-center">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="font-bold text-sm w-4 text-center">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="w-6 h-6 bg-green-100 text-green-600 rounded-full text-xs flex items-center justify-center">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }
    
    if (cartTotalDisplay) cartTotalDisplay.textContent = formatRupiah(total);
    if (cartCountDisplay) cartCountDisplay.textContent = totalItems;
}

// Checkout
function checkout() {
    const customerName = document.getElementById('cust-name').value;
    const customerAddress = document.getElementById('cust-address').value;
    const customerNotes = document.getElementById('cust-notes').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (!customerName.trim() || !customerAddress.trim()) {
        alert("Mohon lengkapi Nama dan Alamat sebelum memesan.");
        return;
    }
    
    let message = `*PESANAN BARU - PIE NANA*\nby nusabit.com\n=========================\n*Detail Pemesan:*\nNama: *${customerName}*\nAlamat/Keterangan: *${customerAddress}*`;
    if (customerNotes.trim()) { 
        message += `\nCatatan: *${customerNotes}*`; 
    }
    message += `\n=========================\n\n*Rincian Pesanan:*\n`;
    
    cart.forEach(item => {
        message += `*- ${item.name}*\n  (${item.quantity} x ${formatRupiah(item.price)}) = *${formatRupiah(item.price * item.quantity)}*\n`;
    });
    
    message += `\n*TOTAL PESANAN: ${formatRupiah(total)}*\n\n_Mohon ditunggu konfirmasinya. Terima kasih!_\n`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Scroll to Cart
function scrollToCart() {
    const cartSection = document.getElementById('cart-checkout-section');
    if (cartSection) {
        cartSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    // Modal cancel button
    const modalCancelBtn = document.getElementById('modal-cancel');
    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', closeQuantityModal);
    }
    
    // Modal confirm button
    const modalConfirmBtn = document.getElementById('modal-confirm');
    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', confirmAddToCart);
    }
    
    // Modal click outside
    const quantityModal = document.getElementById('quantity-modal');
    if (quantityModal) {
        quantityModal.addEventListener('click', (e) => {
            if (e.target.id === 'quantity-modal') {
                closeQuantityModal();
            }
        });
    }
    
    // Toggle cart button
    const toggleCartBtn = document.getElementById('toggle-cart-btn');
    if (toggleCartBtn) {
        toggleCartBtn.addEventListener('click', scrollToCart);
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});