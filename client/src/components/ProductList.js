import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';  // Import the API instance

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    api.get('/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="border rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-500 font-semibold">${product.price}</p>
            <Link to={`/products/${product._id}`} className="text-blue-500 mt-4 block">
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
