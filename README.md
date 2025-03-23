# ScrapeSmart

ScrapeSmart is a **MERN-based Amazon Smart TV scraper** that extracts product details, pricing, offers, and AI-generated review summaries. Built with **Node.js, Puppeteer, Express, React.js, and MongoDB**, it provides an interactive UI for seamless product data retrieval and storage.

![Image](https://github.com/user-attachments/assets/ec57c0d7-e553-4877-bc57-bb252e13c638)
![Image](https://github.com/user-attachments/assets/a9c6d359-88e2-435e-b7e6-aa5317a3a2b1)

### 1. Backend (Node.js + Express.js)

- Use **Puppeteer** (for JavaScript-rendered pages) to scrape Amazon product details.
- Store the extracted data in **MongoDB**.
- Implement an API endpoint (`/scrape`) to trigger the scraper.

### 2. Frontend (React.js)

- Create a UI to input the Amazon product link.
- Display scraped product details (name, price, images, offers, etc.).
- Show an AI-generated summary of customer reviews using **Gemini API**, instead of OpenAI, as **OpenAI does not offer a free tier**.

### 3. Database (MongoDB)

Store scraped product data for future reference.

Tech Stack:

- **Backend:** Node.js, Express.js, Puppeteer/Cheerio
- **Frontend:** React.js, Tailwind CSS
- **Database:** MongoDB (to store scraped data)
- **AI Summary:** Gemini API for review summarization

## 🚀 Features

✅ Extracts product name, price, ratings, and discount information  
✅ Fetches bank offers, "About This Item" section, and product specifications  
✅ Scrapes product images and manufacturer details  
✅ AI-generated customer review summary (**Gemini API**)  
✅ Interactive UI for entering and displaying scraped product details  
✅ Stores scraped data in MongoDB for easy retrieval

### 🔍 How It Works

- Enter an Amazon Smart TV product link in the UI.
- Click Scrape to fetch product details.
- View structured product data with AI-generated review insights.
- Data is stored in MongoDB for future reference.

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
- Uses **Gemini** `(generateReviewSummaryGemini)` instead of OpenAI, as **OpenAI does not offer a free tier**.
- The generated summary provides a quick insight into customer opinions.

### 3. **Saving Product Data**

- After scraping and processing the reviews, the product details (including the generated summary) are stored in the database using MongoDB.
- A new product instance is created and saved asynchronously.
