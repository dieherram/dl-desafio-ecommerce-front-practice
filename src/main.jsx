import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductContextProvider } from './context/ProductContext.jsx'
import { CartProvider } from './context/CartContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductContextProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >,
)

const rainContainer = document.getElementById('rainContainer');

function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = `${Math.random() * 100}vw`;
  raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
  raindrop.style.opacity = Math.random();
  rainContainer.appendChild(raindrop);

  setTimeout(() => {
    raindrop.remove();
  }, 2000);
}

setInterval(createRaindrop, 50);
