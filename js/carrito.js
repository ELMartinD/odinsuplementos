let cartItems = []; // Array que guardará los productos en el carrito
let cartIsOpen = false; // Variable para saber si el carrito está abierto o no

// Función para mostrar u ocultar el carrito
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = (cartIsOpen) ? 'none' : 'block'; // Si está abierto, lo cerramos. Si está cerrado, lo mostramos.
    cartIsOpen = !cartIsOpen; // Invertimos el estado del carrito
}

// Función para añadir un producto al carrito
function addToCart(name, price, imageUrl) {
    const item = {
        name: name,
        price: parseFloat(price),
        imageUrl: imageUrl
    };

    cartItems.push(item); // Agregamos el producto al carrito
    updateCart(); // Actualizamos el carrito

    if (!cartIsOpen) {
        toggleCart(); // Abrimos el carrito solo si no está abierto
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cartItems.splice(index, 1); // Eliminar el producto en el índice especificado
    updateCart(); // Actualizamos el carrito después de eliminar el producto
}

// Función para actualizar el carrito
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpiamos el contenedor del carrito

    let total = 0;

    // Creamos una fila para cada producto
    cartItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');

        // Añadimos la imagen, nombre y precio del producto al carrito
        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="cart-item-details">
                <h3><strong>${item.name}</strong></h3> <!-- Nombre del producto -->
                <h3>$${item.price.toFixed(2)}</h3> <!-- Precio del producto -->
            </div>
            <button class="btn-remove" onclick="removeFromCart(${index})">Eliminar</button> <!-- Botón de eliminar -->
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price;
    });

    // Agregar el costo de envío
    const shippingCost = 5;
    const totalWithShipping = total + shippingCost;

    // Actualizar el total en la interfaz
    document.getElementById('total-price').textContent = total.toFixed(2);
    document.getElementById('total-with-shipping').textContent = totalWithShipping.toFixed(2);
}

// Función para integrar con Mercado Pago (checkout)
function initiateCheckout() {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shippingCost = 5;
    const totalWithShipping = total + shippingCost;

    // Aquí creamos la preferencia de pago en Mercado Pago
    fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Reemplaza con tu Access Token
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: cartItems.map(item => ({
                title: item.name,
                quantity: 1,
                unit_price: item.price
            })),
            back_urls: {
                success: 'https://www.tusitio.com/success',
                failure: 'https://www.tusitio.com/failure',
                pending: 'https://www.tusitio.com/pending'
            },
            auto_return: 'approved',
            notification_url: 'https://www.tusitio.com/ipn' // URL para recibir notificaciones de pago
        })
    })
    .then(response => response.json())
    .then(data => {
        // Redirigir al usuario al checkout de Mercado Pago
        const mpCheckoutUrl = data.init_point;
        window.location.href = mpCheckoutUrl;
    })
    .catch(error => console.error('Error:', error));
}

// Agregar evento a los botones de comprar
document.querySelectorAll('.btn-buy').forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.getAttribute('data-name');
        const productPrice = event.target.getAttribute('data-price');
        const productImage = event.target.closest('.product-card').querySelector('img').src;
        addToCart(productName, productPrice, productImage);
    });
});

// Cerrar el carrito cuando se hace clic fuera de él (excepto en el botón de "Comprar" o "Eliminar")
document.addEventListener('click', function(event) {
    const cart = document.getElementById('cart');
    const buyButton = event.target.closest('.btn-buy');
    const removeButton = event.target.closest('.btn-remove');
    
    // Si el clic fue fuera del carrito, y no se hizo clic en un botón de "Comprar" ni en "Eliminar"
    if (!cart.contains(event.target) && !buyButton && !removeButton) {
        cart.style.display = 'none'; // Cerrar el carrito
        cartIsOpen = false; // Cambiar el estado del carrito a cerrado
    }
});

