import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  Header, 
  HomePage, 
  ProductCatalog, 
  ProductDetail, 
  Cart, 
  ContactUs, 
  AboutUs, 
  Footer 
} from './components';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Motichur Laddu",
    price: 275,
    originalPrice: 300,
    image: "https://images.pexels.com/photos/18488297/pexels-photo-18488297.jpeg",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "5 Days",
    description: "Traditional motichur laddu made with pure ghee and finest gram flour, perfect for festivals and celebrations.",
    ingredients: "Gram flour, Sugar, Ghee, Cardamom, Almonds",
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Assorted Baklawas (9pcs)",
    price: 740,
    originalPrice: 800,
    image: "https://images.pexels.com/photos/8887051/pexels-photo-8887051.jpeg",
    category: "Baklawas",
    weight: "500 Gms",
    shelfLife: "30 Days",
    description: "Authentic Turkish baklawas with layers of phyllo pastry, nuts, and honey syrup.",
    ingredients: "Phyllo pastry, Pistachios, Walnuts, Honey, Butter",
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Kaju Katli",
    price: 565,
    originalPrice: 600,
    image: "https://images.pexels.com/photos/18488310/pexels-photo-18488310.jpeg",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "10 Days",
    description: "Premium cashew fudge with silver leaf, a royal treat for special occasions.",
    ingredients: "Cashews, Sugar, Ghee, Silver leaf",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Ghee Mysorepak",
    price: 275,
    originalPrice: 320,
    image: "https://images.pexels.com/photos/8887018/pexels-photo-8887018.jpeg",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "5 Days",
    description: "Traditional Mysore pak made with pure ghee, gram flour and sugar.",
    ingredients: "Gram flour, Sugar, Pure Ghee, Cardamom",
    rating: 4.6,
    reviews: 98
  },
  {
    id: 5,
    name: "Mix Sweets",
    price: 615,
    originalPrice: 680,
    image: "https://images.pexels.com/photos/8887025/pexels-photo-8887025.jpeg",
    category: "Sweets",
    weight: "500 Gms",
    shelfLife: "6 Days",
    description: "Assorted traditional Indian sweets perfect for gifting and celebrations.",
    ingredients: "Various traditional ingredients",
    rating: 4.5,
    reviews: 73
  },
  {
    id: 6,
    name: "Gulab Jamun",
    price: 305,
    originalPrice: 350,
    image: "https://images.pexels.com/photos/8887054/pexels-photo-8887054.jpeg",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "7 Days",
    description: "Soft and spongy gulab jamuns soaked in aromatic sugar syrup.",
    ingredients: "Milk solids, Sugar, Ghee, Rose water, Cardamom",
    rating: 4.8,
    reviews: 142
  },
  {
    id: 7,
    name: "Besan Laddu",
    price: 708,
    originalPrice: 750,
    image: "https://images.pexels.com/photos/8887063/pexels-photo-8887063.jpeg",
    category: "Sweets",
    weight: "500 Gms",
    shelfLife: "10 Days",
    description: "Traditional besan laddus made with roasted gram flour and ghee.",
    ingredients: "Gram flour, Sugar, Ghee, Almonds, Cardamom",
    rating: 4.7,
    reviews: 89
  },
  {
    id: 8,
    name: "Rasgulla",
    price: 210,
    originalPrice: 240,
    image: "https://images.unsplash.com/photo-1714799263412-2e0c1f875959?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxyYXNndWxsYXxlbnwwfHx8fDE3NDg2NjUxNzl8MA&ixlib=rb-4.1.0&q=85",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "3 Days",
    description: "Soft and spongy cottage cheese balls in sugar syrup.",
    ingredients: "Cottage cheese, Sugar, Cardamom",
    rating: 4.6,
    reviews: 67
  },
  {
    id: 9,
    name: "Coconut Burfi",
    price: 365,
    originalPrice: 400,
    image: "https://images.pexels.com/photos/11484120/pexels-photo-11484120.jpeg",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "8 Days",
    description: "Fresh coconut burfi with a melt-in-mouth texture.",
    ingredients: "Fresh coconut, Sugar, Milk, Cardamom",
    rating: 4.4,
    reviews: 54
  },
  {
    id: 10,
    name: "Soan Papdi",
    price: 285,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1605194000384-439c3ced8d15?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxsYWRkdXxlbnwwfHx8fDE3NDg2NjUxODV8MA&ixlib=rb-4.1.0&q=85",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "15 Days",
    description: "Flaky and crispy soan papdi with a delicate texture.",
    ingredients: "Gram flour, Sugar, Ghee, Cardamom, Pistachios",
    rating: 4.3,
    reviews: 41
  },
  {
    id: 11,
    name: "Dry Fruits Mix",
    price: 890,
    originalPrice: 950,
    image: "https://images.pexels.com/photos/6208144/pexels-photo-6208144.jpeg",
    category: "Dry Fruits",
    weight: "500 Gms",
    shelfLife: "90 Days",
    description: "Premium quality mixed dry fruits including almonds, cashews, and pistachios.",
    ingredients: "Almonds, Cashews, Pistachios, Raisins, Dates",
    rating: 4.9,
    reviews: 203
  },
  {
    id: 12,
    name: "Pistachio Rolls",
    price: 465,
    originalPrice: 520,
    image: "https://images.unsplash.com/photo-1610550246952-0c906d3aca7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxsYWRkdXxlbnwwfHx8fDE3NDg2NjUxODV8MA&ixlib=rb-4.1.0&q=85",
    category: "Sweets",
    weight: "250 Gms",
    shelfLife: "12 Days",
    description: "Rich pistachio rolls with layers of nuts and sweet filling.",
    ingredients: "Pistachios, Milk solids, Sugar, Ghee",
    rating: 4.7,
    reviews: 76
  }
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
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
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
            element={
              <HomePage 
                products={mockProducts} 
                addToCart={addToCart}
              />
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProductCatalog 
                products={mockProducts} 
                addToCart={addToCart}
                searchQuery={searchQuery}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetail 
                products={mockProducts} 
                addToCart={addToCart}
              />
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