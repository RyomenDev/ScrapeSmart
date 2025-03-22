
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { MarkdownWrapper } from "../utils/MarkdownWrapper";

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
      setLoading(true);
      //   const res = await axios.post("http://localhost:5000/api/scrape", { url });
      const res = await axios.get("http://localhost:5000/api/products");
      console.log(res.data[0]);
      setProduct(res.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async () => {
    if (!product) return;
    try {
      await axios.post("http://localhost:5000/api/saveProduct", product);
      alert("Product saved successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
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
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-60 backdrop-blur-md p-4">
          <div className="bg-white text-black max-w-3xl w-full p-6 rounded-2xl shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition duration-300"
              onClick={() => setProduct(null)}
            >
              ✕
            </button>
            {/* Title */}
            <h1 className="text-2xl font-extrabold text-center text-gray-800 mb-4">
              Amazon Smart TV Scraper
            </h1>
            {/* Product Name & Rating */}
            <h2 className="text-lg font-semibold text-center">
              {product.name}
            </h2>
            <p className="text-gray-600 text-center">
              ⭐ {product.rating} ({product.numRatings} ratings)
            </p>
            {/* Save Product Button */}
            <div className="flex justify-center mt-4">
              <button
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                onClick={saveProduct}
              >
                Save Product
              </button>
            </div>
            {/* Close Button */}
            <div className="flex justify-center mt-4">
              <button
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
                onClick={() => setProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
