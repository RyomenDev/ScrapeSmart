import { Product } from "../models/product.model.js";
import scraper from "../utils/Scrapper.js";
// import { generateReviewSummaryOpenAi } from "../utils/openaiUtil.js";
import { generateReviewSummaryGemini } from "../utils/geminiUtil.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const scrapeProduct = asyncHandler(async (req, res) => {
  const { url } = req.body;
  // console.log({ url });

  const data = await scraper(url);

  // console.log("Scraped data:", data);

  if (!data || data.error) {
    return res.status(404).json({ error: "No data scraped" });
    // throw new ApiError(404, "Not able to get data from Amazon");
    // throw ApiError(404, "Not able to get data from Amazon");
  }

  // Generate Review Summary using OpenAI utility
  // const reviewSummary = await generateReviewSummary(data.reviews);
  // console.log(data.reviews);

  const reviewSummary = await generateReviewSummaryGemini(data.reviews);

  // const product = await new Product(data);
  const product = await new Product({ ...data, reviewSummary });
  const newProduct = await new Product({
    name: data?.name,
    rating: data?.rating,
    numRatings: data?.numRatings,
    price: data?.price,
    discount: data?.discount,
    bankOffers: data?.bankOffers,
    about: data?.about,
    productInfo: data?.productInfo,
    images: data?.images,
    //   manufacturerImages: data?.manufacturerImages,
    reviewSummary: reviewSummary,
  });
  // console.log({ newProduct });

  // await product.save();
  //   res.json(product);
  return res
    .status(201)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

//  const reviews = [
//    "Good connectivity and good product, good for Travel use.",
//    "Great multi option for charging, highly recommend, look good and build is also okay , not great but good very functional",
//    "Very useful product during travel and for many countries",
//    "Value for Money , Just as shown in the Picture , Very Useful for people who frequently travel ABROAD.\n" +
//      "Easy to use, Compactness is Awesome.",
//    "The fit of the pins to socket is not perfect and the plug keeps wobbling.",
//    "I have been using this product from last one year. still this one is working fine and there is no problem\n" +
//      "If anyone is looking for universal adapter, I would recommend to go for it.",
//    "Good quality but can't carry load when pinned.. pins design required stable right angle when open.. currently not effective..good for travelling",
//    "It works fine.. but the main pin is little bit lose u need to place it either upside down or place on flat surface.\n",
//  ];
