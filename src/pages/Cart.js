import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderForm from '../components/OrderForm';


import { TrashIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

function Cart() {
    const { cart, removeFromCart, placeOrder } = useCart();
    const [isOrderFormOpen, setOrderFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        toast.success('Product removed from cart!');
    };

    const handlePlaceOrder = (item) => {
        setSelectedItem(item);
        setOrderFormOpen(true);
    };

    const calculateTotal = () =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-4 sm:p-8 max-w-screen-xl mx-auto bg-gray-50">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-orange-600">
                Your Cart
            </h2>

            {cart.length === 0 ? (
                <div className="text-center text-lg text-gray-600">
                    Your cart is empty!
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    
                    <div className="lg:col-span-3 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col lg:grid lg:grid-cols-4 items-center lg:items-stretch p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                
                                <div className="lg:col-span-1 flex justify-center items-center">
                                    <img
                                        src={item.image || item.thumbnail}
                                        alt={item.name || item.title}
                                        className="w-full max-w-[120px] h-auto object-cover rounded"
                                    />
                                </div>

                               
                                <div className="lg:col-span-2 flex flex-col justify-center lg:pl-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                        {item.name || item.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Price: ₹{item.price}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Stock: {item.stock}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>

                               
                                <div className="lg:col-span-1 flex lg:flex-col lg:justify-center lg:space-y-4 mt-4 lg:mt-0 space-x-4 lg:space-x-0">
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 w-full"
                                    >
                                        <TrashIcon className="w-5 h-5 mr-2" />
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => handlePlaceOrder(item)}
                                        className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 w-full"
                                    >
                                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                                        Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Cart Summary
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Total Items: {cart.length}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            Total Price: ₹{calculateTotal()}
                        </p>
                        <button
                            onClick={() => toast.info('Proceeding to Checkout')}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}

            {isOrderFormOpen && (
                <OrderForm
                    onClose={() => setOrderFormOpen(false)}
                    cartItems={[selectedItem]}
                />
            )}
        </div>
    );
}

export default Cart;
