import { useState, useEffect } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetching data from the API
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Log product image URL to check for correctness
        data.products.forEach((product) => {
          console.log('Product Image URL:', product.thumbnail);
        });

        // Assuming the products returned are the "orders" in your context
        const ordersData = data.products.map((product) => ({
          id: product.id,
          name: product.name, // Adding product name
          date: new Date().toLocaleDateString(),  // Adding a sample date for each product
          status: 'Delivered', // Assuming all products are delivered in this example
          total: product.price,
          image: product.thumbnail && product.thumbnail.startsWith('http') ? product.thumbnail : `https://dummyjson.com${product.thumbnail}`, // Added check to ensure image is defined
        }));

        setOrders(ordersData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Function to remove the image
  const removeImage = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, image: null } : order
      )
    );
  };

  if (loading) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-pink-100">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-700">Your Order History</h2>
        <p className="text-center text-lg text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-pink-100">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-700">Your Order History</h2>
        <p className="text-center text-lg text-red-600">Error loading orders: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 via-purple-100 to-pink-100">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-700">Your Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-center mb-4">
              {order.image ? (
                <img
                  src={order.image} // Use `order.image` here instead of `product.image`
                  alt={order.name} // Use `order.name` here
                  className="w-20 h-20 object-cover rounded mr-6"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded mr-6 flex items-center justify-center">
                  <span className="text-gray-600">No Image</span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Product Name:</h3>
                <p className="text-gray-600">{order.name}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Order Date:</h3>
                <p className="text-gray-600">{order.date}</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Status:</h3>
              <p
                className={`text-lg font-medium ${
                  order.status === 'Delivered'
                    ? 'text-green-600'
                    : order.status === 'Processing'
                    ? 'text-yellow-600'
                    : order.status === 'Cancelled'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {order.status}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Total:</h3>
              <p className="text-2xl font-bold text-purple-700">₹{order.total}</p>
            </div>

            {/* Button to remove the image */}
            {order.image && (
              <button
                onClick={() => removeImage(order.id)}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition"
              >
                Remove Image
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
