// /**
//  * @swagger
//  * tags:
//  *   name: Products-Scrapper
//  *   description: API for Scrapping Amazon products
//  */

/**
 * @swagger
 * /api/scrape:
 *   post:
 *     summary: Scrape product details from a given URL
 *     tags: [Products-Scrapper]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://www.amazon.in/rts-Universal-Adapter-International-Worldwide/dp/B082WYMTWF?th=1"
 *     responses:
 *       201:
 *         description: Product scraped and stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67e026f274fd3eca4793ac78"
 *                     name:
 *                       type: string
 *                       example: "rts Universal Travel Adapter"
 *                     rating:
 *                       type: string
 *                       example: "4.2 out of 5 stars"
 *                     numRatings:
 *                       type: string
 *                       example: "13,028 ratings"
 *                     price:
 *                       type: string
 *                       example: "588"
 *                     discount:
 *                       type: string
 *                       example: "-88%"
 *                     bankOffers:
 *                       type: string
 *                       example: "N/A"
 *                     about:
 *                       type: string
 *                       example: "About this item, saving a lot of space for your luggage."
 *                     productInfo:
 *                       type: string
 *                       example: "Manufacturer: rts, Country of Origin: China, Item model number: UTA01"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["https://m.media-amazon.com/images/I/611RCy1XjsL._SY606_.jpg"]
 *                     reviewSummary:
 *                       type: string
 *                       example: "These universal adapter reviews highlight its **travel-friendly design"
 *       404:
 *         description: No data found or invalid request.
 *       500:
 *         description: Internal server error.
 */
