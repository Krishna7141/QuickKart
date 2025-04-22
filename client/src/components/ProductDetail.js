import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.log('No token found. User is not logged in.');
        setMessage('You need to be logged in to add items to the cart.');
        return;
      }

      console.log('Initiating Add to Cart request...');

      const response = await axios.post(
        'http://localhost:5000/api/cart',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Add to Cart response received:', response.data);
      setMessage('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error.response || error);
      setMessage('Failed to add product to cart.');
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-green-500 text-2xl font-semibold mt-4">${product.price}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default ProductDetail;
