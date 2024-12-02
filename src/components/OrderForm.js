import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function OrderForm({ onClose, cartItems }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const { placeOrder } = useCart();

    const handleSubmit = (e) => {
        e.preventDefault();

        placeOrder(cartItems); 
        toast.success('Order placed successfully!'); 
        onClose(); 
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Order Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 bg-violet-600 text-white rounded hover:bg-blue-700">
                        Submit Order
                    </button>
                </form>
                <button 
                    onClick={onClose}
                    className="mt-4 w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
            <ToastContainer /> 
        </div>
    );
}

export default OrderForm;
