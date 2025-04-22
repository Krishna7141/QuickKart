import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">GetIt E-commerce</h1>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/add-product" className="hover:underline">Add Product</Link>
          <Link to="/cart" className="hover:underline">Cart</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
