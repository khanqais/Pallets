const ProductGrid = ({ products, categoryName }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeProductModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onViewDetails={() => openProductModal(product)}
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeProductModal}
        />
      )}
    </>
  );
};
