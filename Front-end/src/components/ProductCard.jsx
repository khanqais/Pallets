import React, { useState } from "react";
import { FaHeart, FaEye } from "react-icons/fa";
import GlowingEffect from "./GlowingEffect";

const ProductCard = ({ product, onViewDetails, onGetQuote, onViewImage }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg transition-all duration-500 border border-white/50 dark:border-gray-700/50 overflow-hidden">
      <GlowingEffect
        blur={10}
        spread={30}
        inactiveZone={0.5}
        proximity={100}
        variant="default"
        glow={true}
        movementDuration={2}
        borderWidth={2}
      />
    
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-2xl transition-colors duration-300">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        
        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <FaHeart className="text-xs" />
          </button>
          <button
            onClick={onViewImage}
            aria-label="View product image"
            className="w-8 h-8 bg-white/80 hover:bg-orange-500 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-300"
          >
            <FaEye className="text-xs" />
          </button>
        </div>
      </div>

      
      <div className="p-4 relative">
        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1 truncate group-hover:text-orange-600 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Size: {product.size}
        </p>

        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {product.price}
          </span>

          <button
            onClick={() => onGetQuote(product)} 
            className="group/btn relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300 text-sm font-semibold"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            <span className="relative z-10">Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
