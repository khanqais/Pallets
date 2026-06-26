import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ProductImageModal = ({ isOpen, product, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-300 text-3xl"
          title="Close"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={product.image}
            alt={product.name}
            loading="eager"
            decoding="async"
            className="w-full h-auto object-contain max-h-[80vh]"
          />
          
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Size: {product.size}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImageModal;
