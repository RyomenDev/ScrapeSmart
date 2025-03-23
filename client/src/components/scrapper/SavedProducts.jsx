// import {ImageFilter} from "../../utils";
import { useState, useEffect } from "react";
import ProductDetails from "./ProductDetails.jsx";
import PropTypes from "prop-types";

export default function SavedProducts({ savedProducts, setSavedProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (savedProducts.length > 0) {
      setTimeout(() => setLoading(false), 1000); // Simulating loading time
    }
  }, [savedProducts]);

  if (savedProducts.length === 0) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-lg p-6">
      <div
        className="relative w-11/12 max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-xl p-6 text-white 
                  max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={() => setSavedProducts([])}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-transform transform hover:scale-110 z-50"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 drop-shadow-lg">
          Saved Products
        </h2>

        {loading ? (
          <div
            className={`grid gap-6 ${
              savedProducts.length === 2
                ? "grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            } animate-pulse`}
          >
            {[...Array(savedProducts.length)].map((_, index) => (
              <div key={index} className="h-48 bg-gray-300/40 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              savedProducts.length === 2
                ? "grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            }`}
          >
            {savedProducts.map((item, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-lg p-4 shadow-md bg-white/20 backdrop-blur-lg text-black hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
                onClick={() => setSelectedProduct(item)}
              >
                {item.images[0] && (
                  <div className="flex justify-center mb-3">
                    <img
                      src={item.images[0]}
                      alt="Product"
                      className="w-40 h-40 object-cover rounded-xl shadow-md border border-white/30 transition transform hover:scale-105 hover:shadow-lg"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-lg text-white text-center">
                  {item.name.length > 20
                    ? item.name.slice(0, 45) + "..."
                    : item.name}
                </h3>

                <p className="text-white/90 text-center">
                  Price: ₹{item.price}
                </p>
                <p className="text-yellow-300 text-center">⭐ {item.rating}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Show ProductDetails only when a product is clicked */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </div>
      )}
    </div>
  );
}

// PropTypes validation
SavedProducts.propTypes = {
  savedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      rating: PropTypes.number,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSavedProducts: PropTypes.func.isRequired,
};
