import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductCatalog() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        toast.error('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-10 max-w-screen-xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-600">Loading Products...</h2>
        <p className="text-gray-600">Please wait while we load the product catalog.</p>
      </div>
    );
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="px-6 py-10 max-w-screen-xl mx-auto bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Discover Our Products</h2>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">
                <span className="font-bold text-green-600">₹{product.price}</span>
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  toast.success(`${product.title} added to cart!`);
                }}
                className="w-full py-2 text-sm font-medium text-white rounded bg-green-500 hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

     
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">{selectedProduct.title}</h3>
            <img
              src={selectedProduct.image || selectedProduct.images[0]}
              alt={selectedProduct.title}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="text-lg font-semibold text-gray-800 mb-4">Price: ₹{selectedProduct.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(selectedProduct);
                toast.success(`${selectedProduct.title} added to cart!`);
              }}
              className="w-full py-2 text-sm font-medium text-white rounded bg-green-500 hover:bg-green-600"
            >
              Add to Cart
            </button>
            <button
              onClick={closeModal}
              className="w-full py-2 mt-4 text-sm font-medium text-gray-800 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;
