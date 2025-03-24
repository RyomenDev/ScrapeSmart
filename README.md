# ScrapeSmart

ScrapeSmart is a **MERN-based Amazon Smart TV scraper** that extracts product details, pricing, offers, and AI-generated review summaries. Built with **Node.js, Puppeteer, Express, React.js, and MongoDB**, it provides an interactive UI for seamless product data retrieval and storage.

![Description](./Scrape/Wroking.gif)

<p align="center" style="display: flex; justify-content: center;">
    <img src="https://github.com/user-attachments/assets/e2168b85-915b-41b1-9411-e1485d46fafd" style="width: 45%; height: auto; margin-right: 10px;">
    <img src="https://github.com/user-attachments/assets/a9c6d359-88e2-435e-b7e6-aa5317a3a2b1" style="width: 45%; height: auto;">
</p>

![Image](https://github.com/user-attachments/assets/bfbfff03-4354-4011-876a-3d3f51077b12)

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

- **Backend:** Node.js, Express.js, Puppeteer
- **Frontend:** React.js, Tailwind CSS
- **Database:** MongoDB (to store scraped data)
- **AI Summary:** Gemini API for review summarization
- **Api \& Documentation:** Swagger (OPENAPI)

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

---

## HOW TO RUN

### 1️⃣ Create .env File

Define your environment variables:

### :clubs: A. Client

```ini
VITE_SERVER_URL="http://localhost:5000"
```

### :clubs: B. Server

```sh
VITE_SERVER_URL=http://localhost:5000
MONGO_URI=mongodb://mongodb_container:27017/scrapesmart # if using Container image
# MONGO_URI=mongodb+srv://yourUsername:yourEncodedPassword@cluster0.mongodb.net/yourDatabase # if using cloud Db
# # MONGO_URI="mongodb://localhost:27017/" # If use locally setup DB
PORT=5000
SERVER_URL="http://localhost:5000"
OPENAI_API_KEY="sk-proj-" # get from [Google AI for Developers](https://ai.google.dev/)
GEMINI_API_KEY="AIz.."

```

### 2️⃣ Run Everything

```sh
docker-compose up --build
```

```sh
docker-compose down # – Stops and removes all containers, networks, and volumes defined in the docker-compose.yml file.
```

### TryOut Links

- [Samsung Smartphone](https://www.amazon.in/Samsung-Smartphone-Titanium-Storage-Included/dp/B0DSKMKJV5?th=1) - https://www.amazon.in/Samsung-Smartphone-Titanium-Storage-Included/dp/B0DSKMKJV5?th=1
- [MSI NVIDIA GeForce Ventus Graphic Card](https://www.amazon.in/MSI-NVIDIA-GeForce-Ventus-Graphic/dp/B0B5V8NT52) - https://www.amazon.in/MSI-NVIDIA-GeForce-Ventus-Graphic/dp/B0B5V8NT52
- [ASUS Laptop (i7-13650HX)](https://www.amazon.in/ASUS-Battery-i7-13650HX-Windows-G614JU-N3200WS/dp/B0C4TVHMR9) -https://www.amazon.in/ASUS-Battery-i7-13650HX-Windows-G614JU-N3200WS/dp/B0C4TVHMR9
- [MSI G274QPX 27-inch Gaming Monitor](https://www.amazon.in/MSI-G274QPX-Inch-Gaming-Monitor/dp/B0BSLJ9ZR7) - https://www.amazon.in/MSI-G274QPX-Inch-Gaming-Monitor/dp/B0BSLJ9ZR7
- [Sony PlayStation 5 Slim](https://www.amazon.in/Sony-CFI-2008A01X-PlayStation%C2%AE5-Console-slim/dp/B0CY5HVDS2) - https://www.amazon.in/Sony-CFI-2008A01X-PlayStation%C2%AE5-Console-slim/dp/B0CY5HVDS2

---

### References

- [GeeksForGeeks](https://www.geeksforgeeks.org/scraping-amazon-product-information-using-beautiful-soup/)
- [OpenAI's website](https://platform.openai.com/)
- [Google AI for Developers](https://ai.google.dev/)
