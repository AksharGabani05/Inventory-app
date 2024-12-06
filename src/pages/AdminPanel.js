import { useState, useEffect } from 'react';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', image: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock && newProduct.image) {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
      setNewProduct({ name: '', price: '', stock: '', image: '' });
    }
  };
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };


  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const updateProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock && newProduct.image) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? newProduct : product
        )
      );
      setNewProduct({ name: '', price: '', stock: '', image: '' });
      setEditingProduct(null);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 via-green-100 to-yellow-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-10">Admin Panel</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-12">
        <h3 className="text-2xl font-semibold text-center text-violet-950 mb-6">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Product Price"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Product Stock"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
         
          {newProduct.image && (
            <div className="mt-4">
              <img src={newProduct.image} alt="Product" className="w-full h-40 object-cover rounded-md" />
            </div>
          )}
          <button
            onClick={editingProduct ? updateProduct : addProduct}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-md hover:from-purple-700 hover:to-pink-700 transition duration-200"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Product List</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          
            <img
              src={product.thumbnail ? (product.thumbnail.startsWith('http') ? product.thumbnail : `https://dummyjson.com${product.thumbnail}`) : 'https://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
             <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
            <p className="text-gray-600">Price: ₹{product.price}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => startEditing(product)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
