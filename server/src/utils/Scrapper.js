import puppeteer from "puppeteer";

async function scrapeProduct(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "load", timeout: 0 });

  const data = await page.evaluate(() => {
    const getText = (selector) =>
      document.querySelector(selector)?.innerText.trim() || "N/A";
    const getImages = (selector) =>
      [...document.querySelectorAll(selector)].map((img) => img.src);

    return {
      name: getText("#productTitle"),
      rating: getText(".a-icon-alt"),
      numRatings: getText("#acrCustomerReviewText"),
      price: getText(".a-price-whole"),
      discount: getText(".savingsPercentage"),
      bankOffers: getText("#promotions_feature_div"),
      about: getText("#feature-bullets"),
      productInfo: getText("#productDetails_techSpec_section_1"),
      images: getImages("#imgTagWrapperId img"),
      manufacturerImages: getImages("#aplus img"),
      reviewSummary: getText("#cr-summarization-attributes-list"),
    };
  });

  await browser.close();
  return data;
}

export default scrapeProduct;
