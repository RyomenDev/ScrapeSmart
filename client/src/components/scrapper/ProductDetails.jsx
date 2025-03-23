import { MarkdownWrapper } from "../../utils";
import PropTypes from "prop-types";

export default function ProductDetails({ product, onClose, onSave }) {
  if (!product) return null;

  const closeHandler = () => {
    onClose();
  };

  return (
    <div className="fixed bg-black/30 inset-0 flex justify-center items-center bg-opacity-40 backdrop-blur-md p-4">
      <div className=" bg-white/20 bg-opacity-50 backdrop-blur-lg shadow-2xl border border-white/20 max-w-3xl w-full p-6 rounded-3xl relative max-h-[90vh] overflow-y-auto text-white">
        <button
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition duration-300 z-50"
          onClick={closeHandler}
        >
          ✕
        </button>

        <h1 className="text-3xl font-extrabold text-center mb-4 drop-shadow-md">
          Amazon Smart TV Scraper
        </h1>

        {product.images?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-center">Images:</h3>
            <div className="flex justify-center gap-4 mt-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Product"
                  className=" object-cover rounded-xl shadow-md border border-white/30 transition transform hover:scale-105 hover:shadow-lg" // w-40 h-40
                />
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold text-center mt-4">{product.name}</h2>
        <p className="text-center text-gray-300">
          ⭐ {product.rating} ({product.numRatings} ratings)
        </p>

        <div className="flex justify-center items-center gap-4 mt-3">
          <p className="text-2xl font-bold text-green-400">₹{product.price}</p>
          {product.discount && (
            <span className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg">
              {product.discount} OFF
            </span>
          )}
        </div>

        {product.bankOffers && (
          <p className="text-center mt-2 text-gray-300">
            🎁 {product.bankOffers}
          </p>
        )}

        <div className="mt-4 border-t border-gray-500 pt-3">
          <h3 className="text-lg font-semibold">About this Item:</h3>
          <p className="text-gray-300 text-sm">{product.about}</p>
        </div>

        <div className="mt-4 border-t border-gray-500 pt-3">
          <h3 className="text-lg font-semibold">Product Information:</h3>
          <p className="text-gray-300 text-sm">{product.productInfo}</p>
        </div>

        <div className="mt-4 border-t border-gray-500 pt-3">
          <h3 className="text-lg font-semibold">Review Summary:</h3>
          <div className="text-gray-300 text-sm">
            {product.reviewSummary && (
              <MarkdownWrapper review={product.reviewSummary} />
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          {onSave && (
            <button
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition duration-300 hover:scale-105"
              onClick={onSave}
            >
              Save Product
            </button>
          )}
          <button
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition duration-300 hover:scale-105"
            // onClick={onClose}
            onClick={closeHandler}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    numRatings: PropTypes.number,
    price: PropTypes.number.isRequired,
    discount: PropTypes.string,
    bankOffers: PropTypes.string,
    about: PropTypes.string,
    productInfo: PropTypes.string,
    reviewSummary: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func, // Optional
};
