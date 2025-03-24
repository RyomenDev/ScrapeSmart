import { Product } from "../models/product.model.js";
// import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  //   res.json(products);
  return res
    .status(201)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

export const saveProduct = asyncHandler(async (req, res) => {
  const { name, price, _id } = req.body;

  // Check if a product with the same name and price OR the same ID already exists
  const existingProduct = await Product.findOne({
    $or: [{ name, price }, { _id }],
  });

  if (existingProduct) {
    // console.log("ALREADY PRESENT", existingProduct);
    // throw ApiError(409, "Product already exists"); //,{},"Product already exists"
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "Product already exists"));
  }

  const newProduct = new Product({ ...req.body });

  await newProduct.save();
  return res
    .status(201)
    .json(new ApiResponse(200, newProduct, "Product add successfully"));
});

// export const saveProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     const newProduct = new Product({ ...data });
//     // console.log({newProduct});

//     await newProduct.save();
//     res.status(201).json({ message: "Product saved successfully" });
//   } catch (error) {
//     console.log("Error saving product:", error?.message);

//     res.status(500).json({ error: "Failed to save product" });
//   }
// };
