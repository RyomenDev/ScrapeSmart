import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CarouselComponent from "./CarouselComponent.jsx";
import ProductDetails from "./ProductDetails.jsx";
import InputSection from "./InputSection.jsx";
import {
  fetchProduct,
  saveProduct,
  fetchAllSavedProducts,
} from "../../api/index.jsx";
import SavedProducts from "./SavedProducts.jsx";
import { ImageFilter } from "../../utils";

const questions = [
  "Effortlessly extract Smart TV details from Amazon India!",
  "Get product info, ratings, offers & AI-powered insights instantly!",
  "Save time—fetch everything from specs to discounts in one click!",
];

export default function ScrapperHomePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedProducts, setSavedProducts] = useState([]);

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
      const response = await fetchProduct(url);
      //   console.log(response);

      setProduct(response.data);
    } catch {
      alert("Failed to fetch product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!product) return;
    try {
      const response = await saveProduct(product);
      //   console.log(response);
      alert(response.message);
    } catch (error) {
      //   console.log(error.response.data.message);
      alert(error?.message || "Failed to save product. Please try again.");
    }
  };

  const getAllSavedProducts = async () => {
    try {
      const products = await fetchAllSavedProducts();
      setSavedProducts(products.data);
    } catch {
      alert("Failed to fetch saved products. Please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      <CarouselComponent />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        {savedProducts.length === 0 && (
          <>
            <motion.h1 className="text-4xl md:text-6xl font-bold">
              ScrapeSmart
            </motion.h1>
            <motion.p className="text-lg md:text-2xl mt-4 max-w-xl">
              {questions[currentQuestion]}
            </motion.p>
            <InputSection
              url={url}
              setUrl={setUrl}
              scrapeData={scrapeData}
              loading={loading}
            />
          </>
        )}
        {savedProducts.length === 0 && (
          <>
            <button
              onClick={getAllSavedProducts}
              className="bg-purple-500 text-white px-4 py-2 mt-4 rounded-md"
            >
              Get All Saved Products
            </button>
          </>
        )}
        <SavedProducts
          savedProducts={savedProducts}
          setSavedProducts={setSavedProducts}
        />
      </div>

      {product && (
        <ProductDetails
          product={product}
          onClose={() => setProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
