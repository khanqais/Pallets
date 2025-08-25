const ProductDetailModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl z-10 bg-white rounded-full p-2 shadow-lg"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            
            {/* Thumbnail images would go here */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={product.image}
                  alt={`${product.name} view ${i}`}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 hover:border-orange-400 cursor-pointer transition-colors duration-300"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold text-orange-600">{product.price}</span>
                <span className="text-sm text-gray-600">/ Piece</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Specifications Table */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 text-lg">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Size (LxW):</span>
                  <span className="font-medium">{product.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shape:</span>
                  <span className="font-medium">{product.shape}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wood Type:</span>
                  <span className="font-medium">{product.woodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Entry Type:</span>
                  <span className="font-medium">{product.entryType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Load Capacity:</span>
                  <span className="font-medium">{product.loadCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Order:</span>
                  <span className="font-medium">{product.minOrder}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                🔥 Yes! I am interested
              </button>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300">
                📞 Request Callback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
