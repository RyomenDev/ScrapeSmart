import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const HomeImages = [
  "/images/HomeImage1.png",
  "/images/HomeImage2.png",
  "/images/HomeImage3.png",
];

const questions = [
  "Effortlessly extract Smart TV details from Amazon India!",
  "Get product info, ratings, offers & AI-powered insights instantly!",
  "Save time—fetch everything from specs to discounts in one click!",
];

export default function HomePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrapeData = async () => {
    if (!url.trim()) return alert("Please enter a valid Amazon Smart TV URL.");
    try {
      //   setLoading(true);
      const res = await axios.post("http://localhost:5000/api/scrape", { url });
      console.log(res.data);

      //   setProduct(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch product details. Please try again.");
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background Image Slider */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        {HomeImages.map((image, index) => (
          <div key={index} className="w-full h-screen">
            <img
              src={image}
              alt="Background"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        ))}
      </Carousel>

      {/* Overlay */}
      <div className="absolute inset-0 bg-transparent bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ScrapeSmart
        </motion.h1>

        {/* Auto-Sliding Questions */}
        <motion.p
          key={currentQuestion}
          className="text-lg md:text-2xl mt-4 max-w-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
        >
          {questions[currentQuestion]}
        </motion.p>

        {/* Input & Button */}
        <motion.div
          className="mt-6 flex flex-col gap-3 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
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
        </motion.div>
      </div>

      {/* Product Details Section */}
      {product && (
        <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-black bg-opacity-90 p-6">
          <div className="bg-white text-black max-w-3xl w-full p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Amazon Smart TV Scraper</h1>

            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">
              ⭐ {product.rating} ({product.numRatings} ratings)
            </p>
            <p className="text-lg font-semibold text-green-600">
              Price: {product.price}
            </p>
            <p className="text-sm text-red-600">Discount: {product.discount}</p>
            <p className="text-gray-600 mt-2">
              Bank Offers: {product.bankOffers}
            </p>

            <h3 className="font-semibold mt-4">About this Item:</h3>
            <p className="text-sm text-gray-800">{product.about}</p>

            <h3 className="font-semibold mt-4">Product Information:</h3>
            <p className="text-sm text-gray-800">{product.productInfo}</p>

            <h3 className="font-semibold mt-4">AI Review Summary:</h3>
            <p className="text-sm text-gray-800">{product.reviewSummary}</p>

            <h3 className="font-semibold mt-4">Images:</h3>
            <div className="flex gap-2 overflow-x-auto py-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Product"
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              onClick={() => setProduct(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
