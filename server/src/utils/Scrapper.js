import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// Use Puppeteer's stealth plugin to bypass bot detection
puppeteer.use(StealthPlugin());

async function scrapeProduct(url) {
  console.log({ url });

  // Launch Puppeteer with necessary configurations
  const browser = await puppeteer.launch({
    headless: "new", // Run in headless mode for production
    slowMo: 50, // Mimic human behavior
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-infobars",
    ],
  });

  const page = await browser.newPage();

  try {
    // Set User-Agent and Headers to avoid detection
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-site": "same-origin",
    });

    // Go to the product page
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });
    console.log("✅ Page Loaded");

    // Wait for product title to load
    await page.waitForSelector("#productTitle", { timeout: 10000 });

    // Scroll down a bit to mimic user behavior
    await page.evaluate(() => window.scrollBy(0, 300));

    console.log("🔍 Scraping Data...");

    // Extract product details
    const data = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : "N/A";
      };

      return {
        name: getText("#productTitle"),
        price: getText(".a-price-whole") + getText(".a-price-fraction"),
        rating: getText(".a-icon-alt"),
        numRatings: getText("#acrCustomerReviewText"),
      };
    });

    console.log("✅ Scraped Data:", data);
    return data;
  } catch (error) {
    console.error("❌ Scraping Error:", error);
    return {
      error: "Failed to scrape data. Amazon might have blocked access.",
    };
  } finally {
    await browser.close();
    console.log("🚀 Browser Closed");
    process.exit(0);
  }
}

// // Example usage
// const url =
//   "https://www.amazon.in/Daikin-Inverter-Display-Technology-MTKL50U/dp/B0BK1KS6ZD";
// scrapeProduct(url).then((data) => console.log("📦 Final Data:", data));

export default scrapeProduct;

// Example usage
// scrapeProduct(
//   "https://www.amazon.in/Daikin-Inverter-Display-Technology-MTKL50U/dp/B0BK1KS6ZD"
// ).then(console.log);

// const getImages = (selector) =>
//   [...document.querySelectorAll(selector)].map((img) => img.src);

// return {
//   name: getText("#productTitle"),
//   rating: getText(".a-icon-alt") || "No Rating",
//   numRatings: getText("#acrCustomerReviewText") || "0",
//   price: getText(".a-price-whole") || "Not Available",
//   discount: getText(".savingsPercentage") || "No Discount",
//   bankOffers: getText("#promotions_feature_div") || "No Offers",
//   about: getText("#feature-bullets") || "No Description",
//   productInfo: getText("#productDetails_techSpec_section_1") || "No Info",
//   images: getImages("#imgTagWrapperId img"),
//   manufacturerImages: getImages("#aplus img"),
//   reviewSummary:
//     getText("#cr-summarization-attributes-list") || "No Reviews",
// };
