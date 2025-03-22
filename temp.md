# OpenAI Integration in Product Scraper

## Overview
This document provides an overview of how OpenAI is integrated into the product scraping service to generate review summaries for scraped products.

## Implementation
### 1. **Scraper Utility**
- The `scraper` function extracts product details from a given URL.
- Extracted data includes:
  - Name
  - Rating & Number of Ratings
  - Price & Discount
  - Bank Offers
  - About Information
  - Product Specifications
  - Images & Manufacturer Images
  - Customer Reviews

### 2. **Generating Review Summary with OpenAI**
- The extracted reviews are processed using OpenAI's API to generate a concise review summary.
- Previously, OpenAI was used via `generateReviewSummaryOpenAi` but has been replaced with Gemini (`generateReviewSummaryGemini`).
- The generated summary provides a quick insight into customer opinions.

### 3. **Saving Product Data**
- After scraping and processing the reviews, the product details (including the generated summary) are stored in the database using MongoDB.
- A new product instance is created and saved asynchronously.

## Sample Code
```javascript
import { generateReviewSummaryGemini } from "../utils/geminiUtil.js";

export const scrapeProduct = async (req, res) => {
  try {
    const { url } = req.body;
    const data = await scraper(url);
    if (!data || data.error) {
      return res.status(404).json({ error: "No data scraped" });
    }

    const reviewSummary = await generateReviewSummaryGemini(data.reviews);

    const newProduct = new Product({
      ...data,
      reviewSummary
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.error("❌ Scraping Error:", error);
    res.status(500).json({ error: "Scraping failed" });
  }
};
```

## Future Enhancements
- **Improve Prompt Engineering**: Optimize the prompt sent to OpenAI to ensure better quality summaries.
- **Multilingual Support**: Allow summaries to be generated in different languages.
- **Compare AI Models**: Evaluate OpenAI's summarization quality against Gemini and other LLMs.

## Conclusion
Integrating OpenAI (or Gemini) for summarizing product reviews enhances the usability of scraped data. This automation reduces the need for manual analysis and provides quick insights for users.

