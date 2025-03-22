# ScrapeSmart

ScrapeSmart is a **MERN-based Amazon Smart TV scraper** that extracts product details, pricing, offers, and AI-generated review summaries. Built with **Node.js, Puppeteer, Express, React.js, and MongoDB**, it provides an interactive UI for seamless product data retrieval and storage.

### 1. Backend (Node.js + Express.js)

- Use **Puppeteer** (for JavaScript-rendered pages) to scrape Amazon product details.
- Store the extracted data in **MongoDB**.
- Implement an API endpoint (`/scrape`) to trigger the scraper.

### 2. Frontend (React.js)

- Create a UI to input the Amazon product link.
- Display scraped product details (name, price, images, offers, etc.).
- Show an AI-generated summary of customer reviews using **OpenAI API**.

### 3. Database (MongoDB)

Store scraped product data for future reference.

Tech Stack:

- **Backend:** Node.js, Express.js, Puppeteer/Cheerio
- **Frontend:** React.js, Tailwind CSS
- **Database:** MongoDB (to store scraped data)
- **AI Summary:** OpenAI API for review summarization

## 🚀 Features

✅ Extracts product name, price, ratings, and discount information  
✅ Fetches bank offers, "About This Item" section, and product specifications  
✅ Scrapes product images and manufacturer details  
✅ AI-generated customer review summary (OpenAI API)  
✅ Interactive UI for entering and displaying scraped product details  
✅ Stores scraped data in MongoDB for easy retrieval

### 🔍 How It Works

- Enter an Amazon Smart TV product link in the UI.
- Click Scrape to fetch product details.
- View structured product data with AI-generated review insights.
- Data is stored in MongoDB for future reference.
