import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const placeOrder = (orderItems) => {
        if (orderItems.length === 0) return; 
        setOrders([...orders, ...orderItems]); 
        setCart([]); 
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, orders, placeOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
