# How to Get Your OpenAI API Key

## 1️⃣ Sign Up or Log In
- Visit [OpenAI's website](https://platform.openai.com/).
- Click **Sign Up** if you don’t have an account, or **Log In** if you already have one.

## 2️⃣ Generate Your API Key
- Once logged in, click on your profile icon (top-right corner).
- Select **"View API Keys"**.
- Click **"Create new secret key"**.
- Copy the generated API key and **store it securely** (you won’t be able to see it again).

## 3️⃣ Store Your API Key Securely
- In your project root, create a **.env** file and add:
  ```env
  OPENAI_API_KEY=your_secret_key_here
  ```
- **DO NOT** expose your API key publicly (e.g., pushing to GitHub).

## 4️⃣ Use It in Your Code

### Install dotenv (if not installed)
```sh
npm install dotenv
```

### Load API Key in Your Project
```javascript
import dotenv from "dotenv";
dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
console.log("OpenAI API Key Loaded Successfully");
```

Now, you can use `openaiApiKey` to make API requests! 🚀

