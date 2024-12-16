
    document.addEventListener("DOMContentLoaded", function () {
        const searchInput = document.getElementById("search-input");
        const searchResults = document.getElementById("search-results");

        // Detecta cuando se escribe en el input
        searchInput.addEventListener("input", function () {
            searchProduct();
        });

        // Cierra los resultados si se hace clic fuera
        document.addEventListener("click", function (event) {
            if (!searchResults.contains(event.target) && event.target !== searchInput) {
                searchResults.style.display = "none";
            }
        });

        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevenir comportamiento por defecto
                if (searchResults.firstChild) {
                    searchResults.firstChild.click(); // Simular clic en el primer resultado
                }
            }
        });
    });

    function searchProduct() {
        const input = document.getElementById("search-input").value.toLowerCase();
        const products = document.querySelectorAll(".product-card");
        const searchResults = document.getElementById("search-results");
        searchResults.innerHTML = ""; // Limpia resultados previos
        searchResults.style.display = "none"; // Oculta el contenedor por defecto

        products.forEach(product => {
            const titleElement = product.querySelector("h3");
            const titleText = titleElement.textContent.toLowerCase();
            const priceElement = product.querySelector(".text-3 strong");
            const imgElement = product.querySelector("img");

            if (titleText.includes(input)) {
                // Mostrar resultado
                const resultItem = document.createElement("div");
                resultItem.classList.add("search-result-item");
                resultItem.innerHTML = `
                    <img src="${imgElement.src}" alt="${titleText}">
                    <div>
                        <h3>${titleElement.textContent}</h3>
                        <p>${priceElement.textContent}</p>
                    </div>
                `;

                // Evento para desplazarse al producto
                resultItem.addEventListener("click", function () {
                    product.scrollIntoView({ behavior: "smooth", block: "start" });
                    highlightProduct(product); // Resalta el producto
                    searchResults.style.display = "none"; // Oculta resultados
                });

                searchResults.appendChild(resultItem);
                searchResults.style.display = "block"; // Muestra resultados
            }
        });

        // Si no hay resultados, mostrar mensaje
        if (searchResults.childElementCount === 0) {
            const noResult = document.createElement("div");
            noResult.classList.add("search-result-item");
            noResult.textContent = "No se encontraron productos.";
            searchResults.appendChild(noResult);
            searchResults.style.display = "block";
        }
    }

    function highlightProduct(product) {
        // Cambia el fondo a naranja
        product.style.transition = "background-color 0.3s";
        product.style.backgroundColor = "orange";

        // Después de 1 segundo, vuelve al color original
        setTimeout(() => {
            product.style.backgroundColor = "";
        }, 1000);
    }
