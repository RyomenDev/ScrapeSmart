# **Problems Faced During Amazon Scraping & How to Resolve Them**

## 1. Amazon Blocking Scraping Requests

### **Problem:**

Amazon blocks automated bots, preventing data extraction.

### **Solution:**

- **Use Stealth Plugin:**
  ```js
  import puppeteer from "puppeteer-extra";
  import StealthPlugin from "puppeteer-extra-plugin-stealth";
  puppeteer.use(StealthPlugin());
  ```
- **Set User-Agent and Headers:**
  ```js
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({ "Accept-Language": "en-US,en;q=0.9" });
  ```
- **Use Incognito Mode:**
  ```js
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  ```
- **Mimic Human Behavior:** Scroll and delay actions:
  ```js
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(2000);
  ```

## 2. Puppeteer Process Not Closing Properly

### **Problem:**

After scraping, the Puppeteer process remains active, causing memory leaks and errors like:

```
ERROR: The process "XXXXX" not found.
```

### **Solution:**

- Explicitly close the browser and exit the process:
  ```js
  finally {
    await browser.close();
    console.log("🚀 Browser Closed");
    process.exit(0);
  }
  ```
- If using Nodemon, prevent duplicate processes by running:
  ```sh
  npx kill-port 5000
  nodemon index.js
  ```

## 3. Puppeteer Timeout Issues

### **Problem:**

Scraper fails due to elements not loading in time.

### **Solution:**

- Increase timeout in `page.goto()`:
  ```js
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });
  ```
- Use `page.waitForSelector()` with an increased timeout:
  ```js
  await page.waitForSelector("#productTitle", { timeout: 10000 });
  ```

## 4. Scraped Data Returning `undefined`

### **Problem:**

- Selectors might be incorrect.
- Elements may be hidden or dynamically loaded.

### **Solution:**

- Verify selectors using browser DevTools (`document.querySelector()` in console).
- Use Puppeteer’s `evaluate()` to extract content safely:
  ```js
  const getText = (selector) =>
    document.querySelector(selector)?.innerText.trim() || "N/A";
  ```
- Scroll down to load lazy-loaded elements:
  ```js
  await page.evaluate(() => window.scrollBy(0, 300));
  ```

## 5. Scraper Failing to Extract Data

### **Problem:**

Some elements were not found, causing errors.

### **Solution:**

- **Wait for Elements:**
  ```js
  await page.waitForSelector("#productTitle", { timeout: 10000 });
  ```
- **Use Optional Chaining for Queries:**
  ```js
  const getText = (selector) =>
    document.querySelector(selector)?.innerText.trim() || "N/A";
  ```
- **Verify Selectors Manually:**
  Inspect elements using `document.querySelector("#productTitle")` in the browser console.

## 6. Puppeteer Launch Errors (`--no-sandbox` issue)

### **Problem:**

Error when launching Puppeteer, especially in headless environments.

### **Solution:**

- Add proper launch arguments:
  ```js
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  ```
- If running in Docker, use:
  ```sh
  RUN apt-get install -y chromium
  ```

## 7. Slow Execution

### **Problem:**

The scraper took too long to execute.

### **Solution:**

- **Enable Headless Mode:**
  ```js
  const browser = await puppeteer.launch({ headless: true });
  ```
- **Optimize Wait Times:** Use `networkidle2` instead of `domcontentloaded`:
  ```js
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
  ```
- **Limit Puppeteer Resource Usage:**
  ```js
  args: ["--disable-gpu", "--single-process"];
  ```

---

### **Future Improvements:**

- Implement CAPTCHA solving using third-party services.
- Use rotating proxies for enhanced anonymity.
- Store scraped data efficiently in a database.

### ✅ **Final Thoughts**

By implementing these solutions, you can significantly improve the success rate of your Amazon scraper while minimizing detection risks. 🚀
