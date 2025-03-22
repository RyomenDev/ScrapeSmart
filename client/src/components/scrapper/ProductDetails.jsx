import { MarkdownWrapper } from "../../utils/MarkdownWrapper";

export default function ProductDetails({ product, onClose, onSave }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 backdrop-blur-md p-4">
      <div className="bg-white text-black max-w-3xl w-full p-6 rounded-2xl shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition duration-300"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-4">
          Amazon Smart TV Scraper
        </h1>

        <h2 className="text-lg font-semibold text-center">{product.name}</h2>
        <p className="text-gray-600 text-center">
          ⭐ {product.rating} ({product.numRatings} ratings)
        </p>

        <div className="flex justify-center items-center gap-4 mt-3">
          <p className="text-xl font-bold text-green-600">₹{product.price}</p>
          {product.discount && (
            <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-lg">
              {product.discount} OFF
            </span>
          )}
        </div>

        {product.bankOffers && (
          <p className="text-gray-600 text-center mt-2 text-sm">
            🎁 {product.bankOffers}
          </p>
        )}

        <div className="mt-4 border-t border-gray-300 pt-3">
          <h3 className="text-lg font-semibold text-gray-800">
            About this Item:
          </h3>
          <p className="text-gray-700 text-sm">{product.about}</p>
        </div>

        <div className="mt-4 border-t border-gray-300 pt-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Product Information:
          </h3>
          <p className="text-gray-700 text-sm">{product.productInfo}</p>
        </div>

        <div className="mt-4 border-t border-gray-300 pt-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Review Summary:
          </h3>
          <div className="text-gray-700 text-sm">
            {product.reviewSummary && (
              <MarkdownWrapper review={product.reviewSummary} />
            )}
          </div>
        </div>

        {product.images?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Images:</h3>
            <div className="grid grid-cols-3 gap-4 mt-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Product"
                  className="w-full h-28 object-cover rounded-lg shadow-md border border-gray-200"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            onClick={onSave}
          >
            Save Product
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
