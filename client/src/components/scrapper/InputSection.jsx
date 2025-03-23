import PropTypes from "prop-types";

export default function InputSection({ url, setUrl, scrapeData, loading }) {
  return (
    <div className="mt-6 flex flex-col gap-3 w-full max-w-md">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Amazon Smart TV URL"
        className="px-4 py-2 w-full text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button
        className="px-6 py-3 text-lg bg-yellow-500 hover:bg-yellow-600 shadow-xl text-white rounded-md transition"
        onClick={scrapeData}
        disabled={loading}
      >
        {loading ? "Fetching Data..." : "Get Product Information"}
      </button> 
    </div>
  );
}

// PropTypes validation
InputSection.propTypes = {
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  scrapeData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
