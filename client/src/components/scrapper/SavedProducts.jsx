export default function SavedProducts({ savedProducts, setSavedProducts }) {
  if (savedProducts.length === 0) return null;

  return (
    <div className="mt-8 bg-slate-400 p-6 rounded-lg relative w-11/12">
      <button
        onClick={() => setSavedProducts([])}
        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
      >
        ✖
      </button>
      <h2 className="text-xl font-semibold mb-4">Saved Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {savedProducts.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-md bg-white text-black"
          >
            <h3 className="font-semibold">{item.name}</h3>
            <p>Price: {item.price}</p>
            <p>Rating: {item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
