document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessages = [
        "¡Bienvenido!",
        "Hola, ¿en qué podemos ayudarte hoy?",
        "Descubre nuestras ofertas especiales.",
    ];

    let cartItems = [];

    function startShopping() {
        const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
        const welcomeMessage = welcomeMessages[randomIndex];
        document.getElementById("welcome-message").innerText = welcomeMessage;

        const productList = document.getElementById("product-list");
        const cartList = document.getElementById("cart-list");
        const cartTotal = document.getElementById("cart-total");
        const checkoutButton = document.getElementById("checkout-button");

        // Captura las entradas por prompt
        const additionalItemsCount = parseInt(prompt("¿Cuántos productos quieres agregar al carrito?") || 0);

        if (!isNaN(additionalItemsCount)) {
            for (let i = 0; i < additionalItemsCount; i++) {
                const productName = prompt(`Ingrese el nombre del producto ${i + 1}:`);
                const productPrice = parseFloat(prompt(`Ingrese el precio del producto ${i + 1}:`) || 0);

                if (productName && !isNaN(productPrice)) {
                    // Agregar el producto al carrito
                    cartItems.push({ id: cartItems.length + 1, name: productName, price: productPrice, quantity: 1 });
                }
            }
        }

        updateCart();

        productList.addEventListener("click", function (event) {
            if (event.target.tagName === "LI") {
                const productId = event.target.dataset.id;
                const productText = event.target.innerText;
                const productPrice = parseInt(productText.match(/\d+/)[0]);

                const existingItem = cartItems.find(item => item.id === productId);

                if (existingItem) {
                    // Si el producto ya está en el carrito, incrementar la cantidad
                    existingItem.quantity += 1;
                } else {
                    // Si el producto no está en el carrito, agregarlo
                    cartItems.push({ id: productId, name: productText, price: productPrice, quantity: 1 });
                }

                updateCart();
            }
        });

        cartList.addEventListener("click", function (event) {
            if (event.target.tagName === "BUTTON") {
                const itemId = event.target.dataset.itemId;

                // Llamar a la función para operar sobre el DOM
                modifyDOM(itemId);

                // Eliminar el producto del carrito
                cartItems = cartItems.filter(item => item.id !== itemId);

                updateCart();
            }
        });

        checkoutButton.addEventListener("click", function () {
            // Simular un proceso de pago 
            alert("Compra realizada. Gracias por su compra.");

            // Limpiar el carrito después de la compra
            cartItems = [];
            updateCart();

            // Volver a iniciar el proceso de compra
            startShopping();
        });
    }

    function updateCart() {
        const cartList = document.getElementById("cart-list");
        const cartTotal = document.getElementById("cart-total");

        cartList.innerHTML = "";

        let total = 0;

        cartItems.forEach(function (item) {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} <button data-item-id="${item.id}">Eliminar</button>`;
            cartList.appendChild(li);

            // Calcula el subtotal de cada producto
            total += item.price * item.quantity;
        });

        cartTotal.innerText = total.toFixed(2); // Muestra el total con dos decimales
    }

    function modifyDOM(itemId) {
        // Obtener el elemento del DOM con el ID del producto
        const itemElement = document.querySelector(`[data-item-id="${itemId}"]`);

        if (itemElement) {
            // Modificar el contenido del elemento o realizar otras operaciones
            itemElement.innerHTML += " - Modificado";
        }
    }

    // Inicia el proceso de compra
    startShopping();
});



