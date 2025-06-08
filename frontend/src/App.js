import React, { useState } from "react";
import "./App.css";
import Products from "./Shop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Header,
  HomePage,
  ProductCatalog,
  ProductDetail,
  Cart,
  ContactUs,
  AboutUs,
  Footer,
} from "./components";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const updateCartItem = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <div className="App min-h-screen bg-white">
        <Header
          cartItemsCount={getCartItemsCount()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage products={Products} addToCart={addToCart} />}
          />
          <Route
            path="/products"
            element={
              <ProductCatalog
                products={Products}
                addToCart={addToCart}
                searchQuery={searchQuery}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail products={Products} addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                updateCartItem={updateCartItem}
                removeFromCart={removeFromCart}
                getCartTotal={getCartTotal}
              />
            }
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
