import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// Use Puppeteer's stealth plugin to bypass bot detection
puppeteer.use(StealthPlugin());

async function scrapeProduct(url) {
  console.log({ url });

  const browser = await puppeteer.launch({
    executablePath:
      // puppeteer.executablePath(),
      process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium",
    headless: "new", // Run in headless mode for production
    slowMo: 50, // Mimic human behavior
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--disable-gpu",
      "--disable-infobars",
      "--disable-dev-shm-usage",
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
    // console.log("✅ Page Loaded");

    // Wait for product title to load
    await page.waitForSelector("#productTitle", { timeout: 10000 });

    // Scroll down a bit to mimic user behavior
    await page.evaluate(() => window.scrollBy(0, 300));

    // console.log("🔍 Scraping Data...");

    // Extract product details
    const data = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : "N/A";
      };

      const getImages = (selector) =>
        [...document.querySelectorAll(selector)].map(
          (img) =>
            img?.currentSrc ||
            img?.dataset.oldHires ||
            img?.getAttribute("_osrc") ||
            img?.src
        );

      const getReviews = () => {
        return [...document.querySelectorAll(".review-text")].map((review) =>
          review.innerText.trim()
        );
      };

      return {
        name: getText("#productTitle"),
        rating: getText(".a-icon-alt") || "No Rating",
        numRatings: getText("#acrCustomerReviewText") || "0",
        price: getText(".a-price-whole") || "Not Available",
        discount: getText(".savingsPercentage") || "No Discount",
        bankOffers: getText("#promotions_feature_div") || "No Offers",
        about: getText("#feature-bullets") || "No Description",
        productInfo: getText("#productDetails_techSpec_section_1") || "No Info",
        images: getImages("#imgTagWrapperId img"),
        // manufacturerImages: getImages("#aplus img"),
        reviews: getReviews(),
        // landingImage: getImages("#landingImage"),
        // wrapperImages: getImages(".imgTagWrapper img"),
      };
    });

    // console.log("✅ Scraped Data:", data);
    return data;
  } catch (error) {
    console.error("❌ Scraping Error:", error);
    return { error: "Scraping failed" };
  } finally {
    await browser.close();
    console.log("🚀 Browser Closed");
    // process.exit(0);
  }
}

export default scrapeProduct;

// Example usage
// const url =
//   "https://www.amazon.in/Daikin-Inverter-Display-Technology-MTKL50U/dp/B0BK1KS6ZD";
// scrapeProduct(url).then((data) => console.log("📦 Final Data:", data));

// Example usage
// scrapeProduct(
//   "https://www.amazon.in/Daikin-Inverter-Display-Technology-MTKL50U/dp/B0BK1KS6ZD"
// ).then(console.log);

// Launch Puppeteer with necessary configurations
//   const browser = await puppeteer.launch({
//     headless: "new", // Run in headless mode for production
//     slowMo: 50, // Mimic human behavior
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-blink-features=AutomationControlled",
//       "--disable-infobars",
//     ],
//   });
