import React, { useState } from 'react';
import api from '../api';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve and log token for verification
    const token = localStorage.getItem('authToken');
    console.log('Retrieved token on AddProduct page:', token);

    // Log current form values for debugging
    console.log('Form Values:', { name, description, price });

    if (!token) {
      setMessage('You need to be logged in to add products.');
      return;
    }

    try {
      // Validate and convert the price value
      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue <= 0) {
        setMessage('Invalid price value.');
        return;
      }

      console.log('Sending POST request to /products');

      // Send POST request with token in the headers
      const response = await api.post(
        '/products',
        { name, description, price: priceValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response from server:', response.data);

      setMessage('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error.response || error);
      setMessage(error.response?.data?.message || 'Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <button type="submit">Add Product</button>
      <p>{message}</p>
    </form>
  );
};

export default AddProduct;
