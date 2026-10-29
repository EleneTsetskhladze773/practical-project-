document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    
    if (!loginForm) return;

    const loggedInView = document.getElementById("logged-in-view");
    const welcomeMessage = document.getElementById("welcome-message");
    const logoutBtn = document.getElementById("logout-btn");

    const savedUser = JSON.parse(localStorage.getItem("proxyUser"));

    if (savedUser) {
        showLoggedInState(savedUser.name);
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        const name = document.getElementById("name-input").value.trim();
        const email = document.getElementById("email-input").value.trim();
        const password = document.getElementById("password-input").value.trim(); 

        if (name && email && password) {
            const user = { name: name, email: email };
            localStorage.setItem("proxyUser", JSON.stringify(user));
            showLoggedInState(name);
        }
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("proxyUser");
        
        loggedInView.style.display = "none";
        loginForm.style.display = "flex";
        
        document.getElementById("name-input").value = "";
        document.getElementById("email-input").value = "";
        document.getElementById("password-input").value = "";
    });

    function showLoggedInState(name) {
        loginForm.style.display = "none"; 
        loggedInView.style.display = "flex";
        welcomeMessage.innerText = `Welcome, ${name}!`;
    }
});






document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    
    if (!contactForm) return;

    const successMessage = document.getElementById("contact-success");
    const contactInfo = document.getElementById("contact-info"); 

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        contactInfo.style.display = "none";
        contactForm.style.display = "none";
        successMessage.style.display = "block";
    });
});










document.addEventListener("DOMContentLoaded", () => {
    
    const searchForm = document.getElementById("hero-search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
            const searchInput = document.getElementById("hero-search-input");
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = "shop.html?search=" + encodeURIComponent(query);
            }
        });
    }

    if (document.querySelector(".image-grid")) {
        
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');

        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            
            setTimeout(() => {
                
                const womenWords = ["women", "woman", "ქალი", "ქალის", "ქალები"];
                const menWords = ["men", "man", "კაცი", "კაცის", "მამაკაცი", "მამაკაცის"];
                const accWords = ["accessor", "აქსესუარი", "აქსესუარები", "სამკაული"];
                const bagWords = ["bag", "bags", "ჩანთა", "ჩანთები"];

                const matches = (words) => words.some(word => query.includes(word));

                if (matches(womenWords)) {
                    const el = document.getElementById("women");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    return; 
                } 
                else if (matches(menWords)) {
                    const el = document.getElementById("men");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    return; 
                } 
                else if (matches(accWords)) {
                    const el = document.getElementById("accessories");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    return;
                }
                else if (matches(bagWords)) {
                    document.querySelectorAll(".product-card").forEach(p => p.style.display = "flex");
                    document.querySelectorAll(".shop-section").forEach(s => s.style.display = "block");
                    return;
                }

                const products = document.querySelectorAll(".product-card");
                let found = false;
                
                products.forEach(product => {
                    const titleElement = product.querySelector("h3");
                    const name = titleElement ? titleElement.innerText.toLowerCase() : "";
                    
                    if (name.includes(query)) {
                        product.style.display = "flex";
                        found = true;
                    } else {
                        product.style.display = "none";
                    }
                });

                const sections = document.querySelectorAll(".shop-section");
                sections.forEach(section => {
                    const visibleProducts = section.querySelectorAll('.product-card:not([style*="display: none"])');
                    if (visibleProducts.length === 0) {
                        section.style.display = "none"; 
                    } else {
                        section.style.display = "block";
                    }
                });
                
                if (!found) {
                    alert("No products found for: " + query + "\nპროდუქტი ვერ მოიძებნა: " + query);
                }
                
            }, 300); 
        }
    }
});














let cart = JSON.parse(localStorage.getItem("proxyCart")) || [];


document.addEventListener("DOMContentLoaded", () => {
    const openCartBtn = document.getElementById("open-cart-btn");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartDrawer = document.getElementById("cart-drawer");

   
    if (!cartDrawer) return;

   
    if (openCartBtn) {
        openCartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            cartDrawer.classList.add("active");
            cartOverlay.classList.add("active");
        });
    }

    
    const closeCart = () => {
        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");
    };

    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
    if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

   
    updateCartCount();
    renderCart();
});


function addToCart(name, price, image) {
    
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 }); 
    }
    
    
    localStorage.setItem("proxyCart", JSON.stringify(cart));
    
  
    updateCartCount();
    renderCart();
    
    
    document.getElementById("cart-drawer").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
}


function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.innerText = totalItems;
    }
}


function renderCart() {
    const cartContainer = document.getElementById("cart-items-container");
    const totalPriceEl = document.getElementById("cart-total-price");
    
   
    if (!cartContainer) return; 

    cartContainer.innerHTML = ""; 
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            
            total += (item.price * item.quantity);
            
            
            const itemHTML = `
                <div class="cart-item-row">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>Qty: ${item.quantity} &times; $${item.price.toFixed(2)}</p>
                        <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += itemHTML;
        });
    }

    
    if (totalPriceEl) {
        totalPriceEl.innerText = `$${total.toFixed(2)}`;
    }
}


function removeFromCart(index) {
    
    cart.splice(index, 1);
    
    
    localStorage.setItem("proxyCart", JSON.stringify(cart));
    
    
    updateCartCount();
    renderCart();
}