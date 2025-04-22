import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to GetIt E-commerce</h1>
      <p className="text-center text-gray-700 mb-8">Explore a wide variety of products at the best prices!</p>
      <div className="flex justify-center">
        <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500">
          View Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
