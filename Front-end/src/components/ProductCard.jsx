import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";

const ProductCard = ({ product, onViewDetails, onGetQuote, onViewImage }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-[#2E4036]/12 bg-[#F2F0E9] shadow-[0_16px_48px_rgba(26,26,26,0.10)] transition-all duration-500 hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800">
      <div className="relative overflow-hidden rounded-t-[2rem] bg-[#2E4036]/8 dark:bg-gray-700/50">
        <img
          src={product.image}
          alt={product.name || "Product"}
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-cover transition-all duration-700 group-hover:scale-105"
        />

        <div className="absolute right-4 top-4 z-20 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button
            onClick={() => setIsLiked(!isLiked)}
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
              isLiked
                ? 'border-[#CC5833] bg-[#CC5833] text-[#F2F0E9]'
                : 'border-[#F2F0E9]/40 bg-[#1A1A1A]/40 text-[#F2F0E9] hover:bg-[#CC5833]'
            }`}
          >
            <Heart size={14} />
          </button>
          <button
            onClick={onViewImage}
            aria-label="View product image"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F2F0E9]/40 bg-[#1A1A1A]/40 text-[#F2F0E9] transition-all duration-300 hover:bg-[#2E4036]"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>

      <div className="relative p-5">
        <p className="font-data text-[11px] uppercase tracking-[0.18em] text-[#2E4036]/65 dark:text-gray-400">{product.capacity || 'Load Class Pending'}</p>
        <h3 className="mt-1 truncate font-heading text-xl font-bold tracking-tight text-[#1A1A1A] dark:text-gray-100">
          {product.name || 'Custom Wooden Pallet'}
        </h3>
        <p className="mt-1 text-sm text-[#1A1A1A]/70 dark:text-gray-300">
          Size: {product.size}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-heading text-2xl font-bold tracking-tight text-[#CC5833]">
            {product.price}
          </span>

          <button
            onClick={() => onGetQuote(product)} 
            className="magnetic-btn relative inline-flex items-center justify-center overflow-hidden rounded-[1.2rem] bg-[#CC5833] px-4 py-2 text-sm font-semibold text-[#F2F0E9]"
          >
            <span className="magnetic-fill" aria-hidden="true" />
            <span className="relative z-10">Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
