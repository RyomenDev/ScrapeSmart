import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  rating: String,
  numRatings: String,
  price: String,
  discount: String,
  bankOffers: String,
  about: String,
  productInfo: String,
  images: [String],
  //   manufacturerImages: [String],
  reviewSummary: String,
});

export const Product = mongoose.model("Product", productSchema);
