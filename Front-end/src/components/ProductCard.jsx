import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaEye, FaArrowRight } from "react-icons/fa";

const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/50 overflow-hidden">
      
      <div className="relative overflow-hidden bg-gray-100 rounded-t-2xl">
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}></div>
        
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
       
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        )}

        
        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <FaHeart className="text-xs" />
          </button>
          <button
            onClick={onViewDetails}
            className="w-8 h-8 bg-white/80 hover:bg-orange-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
          >
            <FaEye className="text-xs" />
          </button>
        </div>
      </div>

      
      <div className="p-4 relative">
        <div className="mb-3">
          <h3 className="font-bold text-gray-800 text-lg mb-1 truncate group-hover:text-orange-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-orange-400 rounded-full"></span>
            Size: {product.size}
          </p>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={onAddToCart}
            className="group/btn relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            <FaShoppingCart className="relative z-10 text-sm" />
          </button>
        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default ProductCard;
