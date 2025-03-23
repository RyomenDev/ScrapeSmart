// /**
//  * @swagger
//  * tags:
//  *   name: Products-CRUD
//  *   description: API for managing products
//  */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all available products.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "660a3a4b2f9b7c00123abcd1"
 *                       name:
 *                         type: string
 *                         example: "Laptop"
 *                       price:
 *                         type: number
 *                         example: 999.99
 *                       rating:
 *                         type: string
 *                         example: "4.2 out of 5 stars"
 *                       numRatings:
 *                         type: string
 *                         example: "13,019 ratings"
 *                       discount:
 *                         type: string
 *                         example: "-88%"
 *                       bankOffers:
 *                         type: string
 *                         example: "N/A"
 *                       about:
 *                         type: string
 *                         example: "About this product..."
 *                       productInfo:
 *                         type: string
 *                         example: "Detailed product information"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["https://m.media-amazon.com/images/I/41uGjvXbeBL._SX300_SY300_QL70_FMwebp_.jpg"]
 *                       reviewSummary:
 *                         type: string
 *                         example: "Customer review summary"
 *                 message:
 *                   type: string
 *                   example: "Product fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 */

//

//

/**
 * @swagger
 * /api/products/save:
 *   post:
 *     summary: Add a new product (By Scraped Data)
 *     description: Save a new product with a unique name and price.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphone"
 *               rating:
 *                 type: string
 *                 example: "4.2 out of 5 stars"
 *               numRatings:
 *                 type: string
 *                 example: "13,028 ratings"
 *               price:
 *                 type: number
 *                 example: 799.99
 *               discount:
 *                 type: string
 *                 example: "-88%"
 *               bankOffers:
 *                 type: string
 *                 example: "N/A"
 *               about:
 *                 type: string
 *                 example: "About this item, saving a lot of space for your luggage."
 *               productInfo:
 *                 type: string
 *                 example: "Manufacturer: rts, Country of Origin: China, Item model number: UTA01"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://m.media-amazon.com/images/I/71uqj6BKnRL._SX425_.jpg"]
 *               reviewSummary:
 *                 type: string
 *                 example: "These universal adapter reviews highlight its **travel-friendly design"
 *     responses:
 *       201:
 *         description: Product added successfully
 *       409:
 *         description: Product already exists
 *       500:
 *         description: Internal server error
 */



export default {};
